$(function() {
  var dom = {
    tweetalkForms: $('.tweetalk form'),
    roomStream: function(roomId) {
      return $('.tweetalk[data-room-id='+roomId+'] .stream');
    }
  };

  now.renderTweet = function(roomId, tweet) {
    var entry = $('<li>');
    entry.text(tweet);
    console.log(dom.roomStream(roomId));
    dom.roomStream(roomId).append(entry);
  };

  dom.tweetalkForms.live('submit', function() {
    var roomId = $('#room').attr('data-room-id');
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