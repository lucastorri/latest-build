var mongoose = require('mongoose');
var slugr = require('../lib/slugr')
mongoose.connect('mongodb://localhost/latest_build');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var createSlug = function(next) {
  this.slug = slugr.slugify(this.title);
  next();
}

var Talk = new Schema({
  slug: ObjectId,
  title: String,
  authors: [String],
  tags: [String],
  start: Date,
  end: Date,
  tweettalks: [String] // holds tweet ids :P
});

var Conference = new Schema({
  slug: ObjectId,
  title: String,
  venue: String,
  description: String,
  talks: [Talk]
});

Talk.pre('save', createSlug);
Conference.pre('save', createSlug);

var TalkModel = mongoose.model('Talk', Talk);
var ConfModel = mongoose.model('Conference', Conference);

module.exports = {
  Talk: function() { return new TalkModel(); },
  Conference: function { return new ConfModel(); },
  mongoose: mongoose
}
