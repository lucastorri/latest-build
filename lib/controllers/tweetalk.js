var conf = require('conf');
module.exports = function(app, nowjs) {
  var twitter = require('twitter');
  var twit = new twitter({
    consumer_key: conf.twitter.consumerKey,
    consumer_secret: conf.twitter.consumerSecret,
  });
  
  var everyone = nowjs.initialize(app, { socketio: { 'log level': 2 } });
  everyone.now.enterRoom = function(id) {
    var room = nowjs.getGroup(id);
    console.log(this.user.id);
    //room.addUser();
  };

  app.get('/tweetalk/:id', function(request, response) {
    var eventRoom = request.params.id;
    
    console.log(nowjs);
    response.render('tweetalk'/*, { layout: false }*/);
    setInterval(function() {
      room.now.renderTweet('Test '+new Date);
    }, 1000);
  });

  app.post('/tweetalk/:id', function(request, response) {
    
  });
};