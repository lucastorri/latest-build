var conf = require('conf');
module.exports = function(app, nowjs) {
  var twitter = require('twitter');
  var twit = new twitter({
    consumer_key: conf.twitter.consumerKey,
    consumer_secret: conf.twitter.consumerSecret,
  });
  
  app.get('/tweetalk/:id', function(request, response) {
    response.render('tweetalk', {
      layout: false,
      locals: { roomId: request.params.id }
    });
  });

  var getRoom = function(id) {
    var room = nowjs.getGroup(id);
    if (room.augumented) return room;

    room.now.sendTweet = function(roomId, tweet) {
      this.getGroups(function(groups) {
        for (var i in groups) {
          if (groups[i] === roomId) {
            nowjs.getGroup(groups[i]).now.renderTweet(roomId, tweet);
            break;
          }
        }
      });
    };

    room.augumented = true;
    return room;
  };

  var everyone = nowjs.initialize(app, { socketio: { 'log level': 2 } });
  everyone.now.joinRoom = function(id) {
    getRoom(id).addUser(this.user.clientId);
    this.now.joined(this.user, require('everyauth').twitter.user);
  };
};