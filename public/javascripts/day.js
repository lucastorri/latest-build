var dayPage = function(){

  var render = function(){
   $.ajax({
      url: '/conference/day/new',
      success: addDay
    });
  };

  var addDay = function(html){
    $('#days').append(html);
    var last = $('#days').last();
    last.click(function(){
      activate(last);
    });
  };

  var activate = function(day){
    trackPage();
  };

  var bind = function(){

  };

  render();
};
