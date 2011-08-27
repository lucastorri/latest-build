$(function() {
  var dom = {
    talks: $('.talk')
  };

  dom.talks.click(function() {
    var id = $(this).attr('id');
    $.get('/tweetalk/'+id, function(data) {
      $('body').append(data);
      tweetalk(id);
    });
  });
});