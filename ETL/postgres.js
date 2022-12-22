const pg = require('pg');
const client = new pg.Client({user: 'darrien', database: 'questiontest'});
require('pg-essential').patch(pg);
const log = require('./logger.js')

const config = {
  user: 'darrien',
  database: 'questiontest'
}



client.connect((err) => {
  if (err) {
    log('error connecting to postgres ' + err, 'error');
  } else {
    log('Connected to Database', 'success');
  }
})








module.exports = client