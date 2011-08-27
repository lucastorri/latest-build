$(function() {
  var dom = {
    tweetalkForms: $('.tweetalk form'),
    roomStream: function(roomId) {
      return $('.tweetalk[data-room='+roomId+'] .stream');
    }
  };

  now.renderTweet = function(roomId, tweet) {
    var entry = $('<li>');
    entry.text(tweet);
    dom.roomStream(roomId).append(entry);
  };

  dom.tweetalkForms.live('submit', function() {
    var roomId = $(this).parent().attr('data-room');
    now.sendTweet(roomId, this.tweet.value);
    this.tweet.value = '';
    return false;
  });
});

var tweetalk = function(id) {
  now.joinRoom(id, function(stream) {
    //Render existing stream
  });
};