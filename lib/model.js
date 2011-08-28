var mongoose = require('mongoose');
var slugr = require('../lib/slugr');
var minms = require('../lib/minms');
mongoose.connect('mongodb://localhost/latest_build');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = function(app) {

  var adr = app.address();
  var appUrl = 'http://' + adr.address + ((adr.port === 80) ? '' : ':' + adr.port) + '/';

  var createSlug = function(next) {
    this.slug = slugr(this.title);
    next();
  }

  var Talk = new Schema({
    slug: ObjectId,
    description: String,
    shortened: String,
    title: String,
    authors: [String],
    tags: [String],
    start: Date,
    end: Date,
    tweettalks: [String] // holds tweet ids :P
  });

  var Conference = new Schema({
    slug: ObjectId,
    shortened: String,
    title: String,
    venue: String,
    description: String,
    talks: [Talk]
  });

  Conference.pre('save', function(next) {
    var conf = this;
    conf.slug = slugr(conf.title);
    var confUrl = appUrl + 'conference/' + conf.slug;
    var mnzdTotal = 0;
    var talks = conf.talks;

    for (var i = 0; i < talks.size; i++) {

      talks[i].slug = slugr(talks[i].title);
      minms(confUrl+'/'+talks[i].slug, function(err, url) {
        if (!err) { talks[i].shortened = url; }
        mnzdTotal++;
        if (mnzdTotal == talks.size) {
          minms(confUrl, function(err, url) {
            if (!err) { conf.shortened = url; }
            next();
          });
        }
      });

    }
  });

  var TalkModel = mongoose.model('Talk', Talk);
  var ConfModel = mongoose.model('Conference', Conference);

  return {
    Talk: function() { return new TalkModel(); },
    Conference: function() { return new ConfModel(); },
    mongoose: mongoose
  }

}
