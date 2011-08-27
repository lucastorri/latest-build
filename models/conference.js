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


var TweetTalkModel = mongoose.model('TweetTalk', TweetTalk);
var tt = new TweetTalkModel();
tt.tweet = '1234567890';

var TalkModel = mongoose.model('Talk', Talk);
var talk = new TalkModel();
talk.title = 'Ruby duck type with the pros';
talk.authors = ['Araving SV'];
talk.time = Date();
talk.tweettalks = [tt];

var TrackModel = mongoose.model('Track', Track);
var track = new TrackModel();
track.title = 'Learning with the pros';
track.talks = [talk];

var DayModel = mongoose.model('Day', Day);
var day = new DayModel();
day.date = Date();
day.tracks = [track];

var ConfModel = mongoose.model('Conference', Conference);
var conf = new ConfModel();
conf.title = 'Conferencia das Aves';
conf.days = [day];

conf.save(function(err) {
  console.log(err);
});

ConfModel.find({}, function(err, docs) {
  (err && console.log(err)) || docs.forEach(function(d) {
    console.log(d)
  });
});


module.exports = {
  TweetTalk: function() { return new TweetTalkModel(); },
  Talk: function() { return new TalkModel(); },
  Track: function() { return new TrackModel(); },
  Day: function() { return new DayModel(); },
  Conference: function { return new ConfModel(); },
  mongoose: mongoose
}
