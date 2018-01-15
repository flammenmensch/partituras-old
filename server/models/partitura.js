const mongoose = require('mongoose');
const Schema = require('../schemas/partitura');

module.exports = mongoose.model('Partitura', Schema);
