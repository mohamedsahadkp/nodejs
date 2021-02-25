const mongoose = require('mongoose');

const {mongoDBDatabase} = require('../../../config');

mongoose.connect(mongoDBDatabase.hostUrl, mongoDBDatabase.options, function(
  err
) {
  if (err) throw err;
  console.log('MongoDB Successfully Connected');
});

module.exports = {
  mongoose,
};
