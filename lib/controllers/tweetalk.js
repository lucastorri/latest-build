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

  app.get('/tweetalk/:id', function(request, response) {
    response.render('tweetalk', {
      layout: false,
      locals: {
        roomId: request.params.id,
        talkTitle: 'Crazy Talk: '+request.params.id
      }
    });
  });

  var getRoom = function(id) {
    var room = nowjs.getGroup(id);
    if (room.augumented) return room;
    
    room.now.sendTweet = function(roomId, tweet) {
      nowjs.getGroup(roomId).now.renderTweet(roomId, tweet);
    };

    room.people = 0;
    room.on('join', function() {
      room.people++;
      if (room.twitterStream) return;
      twit.stream('statuses/filter', { track: 'google' }, function(stream) {
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
    return room;
  };

  everyone.now.joinRoom = function(id, callback) {
    getRoom(id).addUser(this.user.clientId);
    callback(/* send current stream */);
  };

  everyone.now.leaveRoom = function(id) {
    getRoom(id).removeUser(this.user.clientId);
  };
};