$(function() {
  var dom = {
    tweetalkForms: $('.tweetalk form'),
    roomStream: function(roomId) {
      return $('.tweetalk[data-room="'+roomId+'"] .stream');
    }
  };
  
  now.renderTweet = function(roomId, tweet) {
    var entry = $('<li>');
    entry.append(formatTweet(tweet));
    console.log(dom.roomStream(roomId));
    dom.roomStream(roomId).append(entry);
  };

  dom.tweetalkForms.live('submit', function() {
    var roomId = $(this).parent().attr('data-room');
    $.post('/tweetalk/'+roomId, { text: this.tweet.value }, function() {
      console.log('FOI!');
      this.tweet.value = '';      
    });
    return false;
  });
  
  // modified from TwitterGitter by David Walsh (davidwalsh.name)
  // courtesy of Jeremy Parrish (rrish.org)
  var linkify = function(text) {
    return text
      .replace(/(https?:\/\/[\w\-:;?&=+.%#\/]+)/gi, '<a href="$1">$1</a>')
      .replace(/(^|\W)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>')
      .replace(/(^|\W)#(\w+)/g, '$1#<a href="http://search.twitter.com/search?q=%23$2">$2</a>');
  };

  var formatTweet = function(tweet) {
    return "<p><a href='http://twitter.com/" + tweet.user + "'><img width='16' height='16' alt='" + tweet.user + " on Twitter' src='" + tweet.image + "' /></a>" + linkify(tweet.text) + "</p>"
  };

});

var tweetalk = function(roomId) {
  now.joinRoom(roomId, function(stream) {
    stream.forEach(function(tweet) {
      now.renderTweet(roomId, tweet);
    });
  });
  return {
    close: function() { now.leaveRoom(roomId); }
  };
};