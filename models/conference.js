var mongoose = require('mongoose');
var slugr = require('../lib/slugr')
mongoose.connect('mongodb://localhost/latest_build');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var createSlug = function(next) {
  this.slug = slugr.slugify(this.title);
  next();
}

var TweetTalk = new Schema({
  tweet: String
});

var Talk = new Schema({
  slug: ObjectId,
  title: String,
  authors: [String],
  time: Date,
  tweettalks: [TweetTalk]
});

var Track = new Schema({
  slug: ObjectId,
  title: String,
  talks: [Talk]
});

var Day = new Schema({
  date: Date,
  tracks: [Track]
});

var Conference = new Schema({
  slug: ObjectId,
  title: String,
  days: [Day]
});

Talk.pre('save', createSlug);
Track.pre('save', createSlug);
Conference.pre('save', createSlug);


var ATweetTalk = mongoose.model('TweetTalk', TweetTalk);
var tt = new ATweetTalk();
tt.tweet = '1234567890';

var ATalk = mongoose.model('Talk', Talk);
var talk = new ATalk();
talk.title = 'Ruby duck type with the pros';
talk.authors = ['Araving SV'];
talk.time = Date();
talk.tweettalks = [tt];

var ATrack = mongoose.model('Track', Track);
var track = new ATrack();
track.title = 'Learning with the pros';
track.talks = [talk];

var ADay = mongoose.model('Day', Day);
var day = new ADay();
day.date = Date();
day.tracks = [track];

var AConf = mongoose.model('Conference', Conference);
var conf = new AConf();
conf.title = 'Conferencia das Aves';
conf.days = [day];

conf.save(function(err) {
  console.log(err);
});

AConf.find({}, function(err, docs) {
  (err && console.log(err)) || docs.forEach(function(d) {
    console.log(d)
  });
});
