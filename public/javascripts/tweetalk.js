$(function() {
  var dom = {
    tweetalkForms: $('.tweetalk form'),
    roomStream: function(roomId) {
      return $('.tweetalk[data-room-id='+roomId+'] .stream');
    }
  };
  
  function appendTweet(roomId, tweet) {
    var entry = $('<li>');
    entry.text(tweet);
    console.log(entry, dom.roomStream(roomId));
    dom.roomStream(roomId).append(entry);
  };
  
  now.renderTweet = function(roomId, tweet) {
    console.log(123, roomId, tweet);
    appendTweet(roomId, tweet);
  };
  
  dom.tweetalkForms.live('submit', function() {
    var roomId = $('#room').data('room-id');
    now.sendTweet(roomId, this.tweet.value);
    this.tweet.value = '';
    return false;
  });
  
  now.joined = function(userName, roomId) {
    appendTweet(roomId, userName+' joined');
  };
  
});

var tweetalk = function(id) {
  now.joinRoom(id);
};