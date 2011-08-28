$(function() {
  var dom = {
    tweetalkForms: $('.tweetalk form'),
    roomStream: function(roomId) {
      return $('.tweetalk[data-room='+roomId+'] .stream');
    }
  };
  
  function appendTweet(roomId, tweet) {
    var entry = $('<li>');
    entry.text(tweet);
    dom.roomStream(roomId).append(entry);
  }
  
  now.renderTweet = function(roomId, tweet) {
    appendTweet(roomId, tweet);
  };
  
  dom.tweetalkForms.live('submit', function() {
    //var roomId = $('#room').data('room-id');
    var roomId = $(this).parent().attr('data-room');
    now.sendTweet(roomId, this.tweet.value);
    this.tweet.value = '';
    return false;
  });
  
});

var tweetalk = function(roomId) {
  now.joinRoom(roomId, function(stream) {
  });
};