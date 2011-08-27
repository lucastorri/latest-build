var trackPage = function(day){
  var render = function(){
    $.ajax({
      url: '/conference/day/track/new',
      success: addTrack
    });
  };

  var addTrack = function(html){
    $('#tracks').html(html);
  };

  render();
};
