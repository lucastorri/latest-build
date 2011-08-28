var mongoose = require('mongoose');
var slugr = require('../lib/slugr');
var minms = require('../lib/minms');
mongoose.connect('mongodb://localhost:27017/latest_build');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = function(appUrl) {

  var createSlug = function(next) {
    this.slug = slugr(this.title);
    next();
  }

  var Talk = new Schema({
    slug: { type: String, index: true },
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
    slug: { type: String, index: true },
    shortened: String,
    title: String,
    venue: String,
    description: String,
    talks: [Talk]
  });

  var slugAndMinimize = function(conf, next) {
    conf.slug = slugr(conf.title);
    var confUrl = appUrl + 'conference/' + conf.slug;
    var mnzdTotal = 0;
    var talks = conf.talks;

    for (var i = 0; i < talks.length; i++) {
      talks[i].slug = slugr(talks[i].title);

      minms(confUrl+'/'+talks[i].slug, function(talk) {
        return function(err, url) {
          if (!err) { talk.shortened = url; }
          mnzdTotal++;
          if (mnzdTotal === talks.length) {
            minms(confUrl, function(err, url) {
              if (!err) { conf.shortened = url; }
              next();
            });
          }
        }
      }(talks[i]));

    }
  }

  Conference.pre('save', function(next) {
    slugAndMinimize(this, next);
  });

  var TalkModel = mongoose.model('Talk', Talk);
  var ConfModel = mongoose.model('Conference', Conference);

  return {
    Talk: function() { return new TalkModel(); },
    Conference: function() { return new ConfModel(); },
    mongoose: mongoose
  }

}
