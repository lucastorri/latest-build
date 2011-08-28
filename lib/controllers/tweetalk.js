var conf = require('conf');
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

  var augumentRoom = function(room, callback) {
    room.now.sendTweet = function(roomId, text) {
      twit.verifyCredentials(function (data) {
        console.log(data)
      });
      nowjs.getGroup(roomId).now.renderTweet(roomId, tweet);
    };

    room.people = 0;
    room.on('join', function() {
      room.people++;
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
      room.people--;
      if (room.people > 0) return;
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
      room.addUser(clientId);
      callback(/* send current stream */);
    });
  };

  everyone.now.leaveRoom = function(id) {
    getRoom(id, function(room) {
      room.removeUser(this.user.clientId);
    });
  };
};