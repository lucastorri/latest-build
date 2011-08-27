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
      room.now.renderTweet(roomId, tweet);
    };

    room.augumented = true;
    return room;
  };

  var everyone = nowjs.initialize(app, { socketio: { 'log level': 2 } });
  everyone.now.joinRoom = function(roomId) {
    getRoom(roomId).addUser(this.user.clientId);
    //this.user.name = twitter.user.name;
    this.now.joined(this.user.name, roomId);
  };
};