var conf = require('conf');
var twitter = require('twitter');
var noop = function() {};
module.exports = function(spec) {
  
  var app = spec.app;
  var nowjs = spec.nowjs;
  var everyone = nowjs.getGroup('everyone');
  var twitter = require('twitter');
  var twit = new twitter({
    consumer_key: conf.twitter.consumerKey,
    consumer_secret: conf.twitter.consumerSecret,
    access_token_key: conf.twitter.accessToken,
    access_token_secret: conf.twitter.accessTokenSecret
  });

  app.get('/tweetalk/:confSlug/:talkSlug', function(request, response) {
    var roomId = request.params.confSlug+'/'+request.params.talkSlug;
    response.render('tweetalk', {
      layout: false,
      locals: { roomId: roomId }
    });
  });

  app.post('/tweetalk/:confSlug/:talkSlug', function(request, response) {
    var roomId = request.params.confSlug+'/'+request.params.talkSlug;
    var tweetText = request.body.text;

    var twitterAuth = request.session.auth.twitter;
    var twit = new twitter({
      access_token_key: twitterAuth.accessToken,
      access_token_secret: twitterAuth.accessTokenSecret
    });
    if (process.env.NODE_ENV === 'production') {
      twit.verifyCredentials(noop).updateStatus(tweetText, noop);
    }

    var tweet = {
      user: twitterAuth.user.screen_name,
      image: twitterAuth.user.profile_image_url,
      text: tweetText
    };
    var group = nowjs.getGroup(roomId);
    /* FIX ME! */
    group.tweets.push(tweet);
    /*---------*/
    group.now.renderTweet(roomId, tweet);
  });

  var augumentRoom = function(room, callback) {
    room.people = 0;
    room.on('join', function() {
      if (room.twitterStream) return;
      twit.stream('statuses/filter', { track: room.talkUrl }, function(stream) {
        stream.on('data', function (data) {
          var tweet = {
            user: data.user.screen_name,
            image: data.user.profile_image_url,
            text: data.text
          };
          room.now.renderTweet(room.groupName, tweet);
        });
        room.twitterStream = stream;
      });
    });

    room.on('leave', function() {
      if (room.people > 0) return;
      if (!room.twitterStream) return;
      room.twitterStream.destroy();
      delete room.twitterStream;
    });

    room.augumented = true;
    callback(room);
  };

  var getRoom = function(roomId, callback) {
    var room = nowjs.getGroup(roomId);
    if (room.augumented) {
      callback(room);
      return;
    }
    
    /*FIX ME!*/
    room.tweets = [];
    /*-------*/
    var slugs = roomId.split('/');
    var confSlug = slugs[0];
    var talkSlug = slugs[1];
    spec.model.findTalk(confSlug, talkSlug, function(error, talk) {
      room.talkUrl = talk.shortened;
      augumentRoom(room, callback);
    });
  };

  everyone.now.joinRoom = function(id, callback) {
    var clientId = this.user.clientId;
    getRoom(id, function(room) {
      room.people++;
      room.addUser(clientId);
      callback(room.tweets);
    });
  };

  everyone.now.leaveRoom = function(id) {
    var clientId = this.user.clientId;
    getRoom(id, function(room) {
      room.people--;
      room.removeUser(clientId);
    });
  };
};