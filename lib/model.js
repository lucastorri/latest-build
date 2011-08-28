var mongoose = require('mongoose');
var slugr = require('./slugr');
var minms = require('./minms');
mongoose.connect('mongodb://localhost:27017/latest_build');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = function(appUrl) {

  var Talk = new Schema({
    slug: { type: String, index: true },
    description: String,
    owner: String,
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
    start: Date,
    end: Date,
    talks: [Talk]
  });

  Conference.path('title').validate(function (title) {
    return title.length > 0;
  }, 'empty');


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

  var storeDateRange = function(conf, next) {
    if (conf.talks) {
      var dates = [];
      conf.talks.forEach(function(t) {
        dates.push(t.start);
        dates.push(t.end);
      });

      var sortedDates = dates.sort(function(a,b) {
        var aTime = a.getTime();
        var bTime = b.getTime();
        return (aTime === bTime) ? 0 : ((aTime > bTime) ? 1 : -1);
      });
      console.log(sortedDates);

      conf.start = sortedDates[0];
      conf.end = sortedDates[sortedDates.length -1];
    }

    next();
  };

  Conference.pre('save', function(next) {
    var conf = this;
    slugAndMinimize(conf, function() {
      storeDateRange(conf, next);
    });
  });

  var TalkModel = mongoose.model('Talk', Talk);
  var ConfModel = mongoose.model('Conference', Conference);

  var findAllConferences = function(callback) {
    ConfModel.find({}, ['slug', 'title'], callback).sort({start:-1});
  };

  var findConference = function(confSlug, callback) {
    ConfModel.findOne({'slug':confSlug}, callback);
  };

  var findTalk = function(confSlug, talkSlug, callback) {
    ConfModel.findOne({'slug':confSlug, 'talks.slug':talkSlug}, callback);
  };

  return {
    Talk: TalkModel,
    Conference: ConfModel,
    findTalk: findTalk,
    findAllConferences: findAllConferences,
    findConference: findConference,
    mongoose: mongoose
  }

}
