require('dotenv').config();

const { Pool, types } = require('pg');

const pool = new Pool();

// return a float from datatype 1700 returned from Postgres, NUMERIC type
types.setTypeParser(1700, (val) => {
  return parseFloat(val);
});

// return an integer from datatype 20 returned from Postgres, from COUNT() functions
types.setTypeParser(20, (val) => {
  return parseInt(val);
});

module.exports = {
  // query connection for most database interactions
  query: (text, params) => {
    return pool.query(text, params);
  },
  // single client connection for transaction interactions
  getClient: () => {
    return pool.connect();
  }
};