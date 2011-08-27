module.exports = function(app) {
  var TwitterNode = require('twitter-node').TwitterNode;

  app.get('/tweetalk/:id', function(request, response) {
     var twit = new TwitterNode();
     twit.location(-74, 40, -73, 41);
     twit
       .addListener('tweet', function(tweet) {
         console.log("@" + tweet.user.screen_name + ": " + tweet.text);
       }).stream();
     response.render('tweetalk', { layout: false });
  });
};