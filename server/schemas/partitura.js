const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const LyricsSchema = new mongoose.Schema({
  text: { type: String, default: null }
}, { _id: false });

const ScoresSchema = new mongoose.Schema({
  pageCount: { type: Number, default: 0 },
  pages: { type: Array, default: null }
}, { _id: false });

const PartituraSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: Array, default: null },
  cover: { type: String, default: null },
  source: { type: String, default: null },
  music: { type: Array, default: null },
  poetry: { type: Array, default: null },
  lyrics: { type: LyricsSchema, default: null },
  scores: { type: ScoresSchema, default: null },
});

PartituraSchema.plugin(random);

module.exports = PartituraSchema;
