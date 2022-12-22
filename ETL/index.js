const fs = require('fs');
const log = require('./logger.js');
const csv = require('csv-parser');
const pg = require('./postgres.js');
const async = require('async');

const { performance } = require('perf_hooks');



// MAGIC //
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
//////

/*
 id,product_id,body,date_written,asker_name,asker_email,reported,helpful
*/

const getAllQuestions =  (x) => {
  let data = []
  return new Promise((resolve, reject) => {
    log(`[${x}] Started E&T - Questions`, 'yellow')
    fs.createReadStream('../old/questions.csv')
      .on('error', (err) => {
        reject(err);
      })
      .pipe(csv())
      .on('data', async (row) => {
        data.push(row);
      })
      .on('end', () => {
        resolve(data);
        data = null;
      })
  })
}

const getAllAnswers =  (x) => {
  let data = []
  return new Promise((resolve, reject) => {
    log(`[${x}] Started E&T - Answers`, 'yellow')
    fs.createReadStream('../old/answers.csv')
      .on('error', (err) => {
        reject(err);
      })
      .pipe(csv())
      .on('data', async (row) => {
         data.push(row);
      })
      .on('end', () => {
        resolve(data)
        data = null;
      })
  })
}

const getAllPhotos =  (x) => {
  let data = []
  return new Promise((resolve, reject) => {
    log(`[${x}] Started E&T - Photos`, 'yellow')
    fs.createReadStream('../old/answers_photos.csv')
      .on('error', (err) => {
        reject(err);
      })
      .pipe(csv())
      .on('data', async (row) => {
         data.push(row);
      })
      .on('end', () => {
        resolve(data)
        data = null;
      })
  })
}


const bulkInsert = async (arr, columns, table, x) => {
  log(`[${x}] Started Loading - ${table}`, 'yellow')
  try {
    await pg.executeBulkInsertion(arr, columns, table)
    return true;
  } catch (e) {
    log(e + ' inside bulk | ' + table, 'error')
    return false;
  }

}

const startEtlPipeline = async (x) => {
  let startTime, endTime, totalTime, date
  if (x === 0) {
    try {
      startTime = performance.now();
      let questions = await getAllQuestions(x);
      endTime = performance.now();
      date = new Date(endTime-startTime);
      log(`[${x}] E&T complete - Questions! Time Taken: ${date.getMinutes()}:${date.getSeconds()}s`, 'success');
      startTime = performance.now();
      let columns = ['product_id', 'body', 'date_written', 'asker_name', 'asker_email', 'reported', 'helpful'];
      let insert = await bulkInsert(questions, columns, 'questions', x);
      if (insert) {
        endTime = performance.now();
        date = new Date(endTime-startTime)
        log(`[${x}] Load complete - Questions! | Time Taken: ${date.getMinutes()}:${date.getSeconds()}s`, 'success');
      }
    } catch (e) {
      log(e, 'error');
      process.exit()
    }
  } else if (x === 1) {
    try {
      startTime = performance.now();
      let answers = await getAllAnswers(x);
      endTime = performance.now();
      date = new Date(endTime-startTime);
      log(`[${x}] E&T complete - Answers! Time Taken: ${date.getMinutes()}:${date.getSeconds()}s`, 'success');

      startTime = performance.now();
      let columns = ['question_id', 'body', 'date_written', 'answerer_name', 'answerer_email', 'reported', 'helpful'];
      log(`[${x}] File size to big to load at once... Splitting Load into 2 runs...`, 'info');
      let firsInsert = await bulkInsert(answers.slice(0, (answers.length / 2)), columns, 'answers', x);
      let secondInsert = await bulkInsert(answers.slice(answers.length / 2 + 1, answers.length - 1), columns, 'answers', x);

      if (secondInsert) {
        endTime = performance.now();
        date = new Date(endTime-startTime)
        log(`[${x}] Load complete - Answers! | Time Taken: ${date.getMinutes()}:${date.getSeconds()}s`, 'success');
      }
    } catch (e) {
      log(e, 'error');
      process.exit()
    }
  } else if (x === 2) {
    try {
      startTime = performance.now();
      let photos = await getAllPhotos(x);
      endTime = performance.now();
      date = new Date(endTime-startTime);
      log(`[${x}] E&T complete - Photos! Time Taken: ${date.getMinutes()}:${date.getSeconds()}s`, 'success');

      startTime = performance.now();
      let columns = ['answer_id', 'url'];
      let insert = await bulkInsert(photos.slice(0, (photos.length / 2)), columns, 'photos', x);

      if (insert) {
        endTime = performance.now();
        date = new Date(endTime-startTime)
        log(`[${x}] Load complete - Photos! | Time Taken: ${date.getMinutes()}:${date.getSeconds()}s`, 'success');
      }
    } catch (e) {
      log(e, 'error');
      process.exit()
    }
  }
}

let stack = [];
for (let i = 0; i < 3; i++) {
  stack.push(startEtlPipeline(i))
}
async.each(stack, (res, err)  => {
})


// startEtlPipeline();