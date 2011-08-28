$(function() {
  var dom = {
    talks: $('.talk')
  };

  dom.talks.click(function() {
    var talk = $(this);
    var id = talk.attr('id');
    $.get('/tweetalk/'+id, function(data) {
      data = $(data);
      var position = talk.position();
      var title = $('.title', data);
      title.hide();
      data.dialog({
        title: title.text(),
        position: [position.left, position.top]
      });
      tweetalk(id);
    });
  });
});