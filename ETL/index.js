const fs = require('fs');
const log = require('./logger.js');
const csv = require('csv-parser');
const pg = require('./postgres.js');

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

const getAllQuestions =  () => {
  let data = []
  return new Promise((resolve, reject) => {
    log('Started Extraction & Transformation...', 'yellow')
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
      })
  })
}

const bulkInsert = async (arr) => {
  log('Started Loading...', 'yellow')
  const columns = ['product_id', 'body', 'date_written', 'asker_name', 'asker_email', 'reported', 'helpful'];
  try {
    await pg.executeBulkInsertion(arr, columns, 'questions');
    return true;
  } catch (e) {
    log(e, 'error')
    return false;
  }

}

const startEtlPipeline = async () => {
  let startTime, endTime, totalTime, date
  try {
    startTime = performance.now();
    let questions = await getAllQuestions();
    endTime = performance.now();
    date = new Date(endTime-startTime);
    log(`E&T complete! Time Taken: ${date.getMinutes()}:${date.getSeconds()}s`, 'success');
    startTime = performance.now();
    let insert = await bulkInsert(questions);
    if (insert) {
      endTime = performance.now();
      date = new Date(endTime-startTime)
      log(`Successful Load! | Time Taken: ${date.getMinutes()}:${date.getSeconds()}s`, 'success');
    }
  } catch (e) {
    log(e, 'error');
    process.exit()
  }

}

startEtlPipeline();