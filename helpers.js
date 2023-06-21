/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const sql = require('tedious').Connection;
var config = {
  server: '172.16.20.200', //update me
  authentication: {
    type: 'default',
    options: {
      userName: 'SMS1018', //update me
      password: 'T98WULvxxVfn1wteetjf', //update me
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: false,
    database: 'Honohr_Uat', //update me
  },
};
var connection = new sql(config);
connection.on('connect', function (err) {
  // If no error, then good to proceed.
  console.log(err);
  console.log('SQL Connected');
  executeStatement();
});

connection.connect();

function executeStatement() {
  var request = new Request(
    "SELECT * from PayComputation_Outlier WHERE PayheadName = 'BASIC' AND EmpCode = '1110007'",
    function (err, rowCount) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log(rowCount + ' rows');
      }
      connection.close();
    }
  );
  console.log('REQUEST', request);
  var result = '';
  request.on('row', function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log('NO VALUE NULL');
      } else {
        result += column.value + ' ';
      }
    });
    console.log('RESULT', result);
    result = '';
  });

  request.on('done', function (rowCount, more) {
    console.log(rowCount + ' rows returned');
  });

  // Close the connection after the final event emitted by the request, after the callback passes
  request.on('requestCompleted', function (rowCount, more) {
    connection.close();
  });
  connection.execSql(request);
}

const getData = require('./controllers/corsControllers/custom').getData;

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require('moment');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// Making a static map is really long - this is a handy helper function to make one

// inserting an SVG
exports.icon = (name) => {
  try {
    return fs.readFileSync(`./public/images/icons/${name}.svg`);
  } catch (error) {
    return null;
  }
};
exports.image = (name) => fs.readFileSync(`./public/images/photos/${name}.jpg`);

exports.adminPhotoUrl = (admin) => {
  if (admin) {
    return admin.photo ? '/' + admin.photo : '/images/photos/profile.jpg';
  } else {
    return '/images/photos/profile.jpg';
  }
};

// Some details about the site
exports.siteName = `Express.js / SQL / Rest Api`;
