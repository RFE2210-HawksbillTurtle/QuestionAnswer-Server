const fs = require('fs');
const log = require('./logger.js');
const csv = require('csv-parser');


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
    fs.createReadStream('questions.csv')
      .on('error', (err) => {
        reject(err);
      })
      .pipe(csv())

      .on('data', (row) => {
        data.push(row)
      })

      .on('end', () => {
        resolve(data);
      })
  })

}

const startEtlPipeline = async () => {
  try {
    let questions = await getAllQuestions();
    console.log(questions[0])
  } catch (e) {
    log(e, 'error')
  }

}

startEtlPipeline();