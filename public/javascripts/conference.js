var conferencePage = function(){
  var bind = function(){
    enableAddDay();
  };

  var createDay = function(e){
    e.preventDefault();
    var day = dayPage();
  };

  var enableAddDay = function(){
    $('#new_day').click(createDay);
  };

  bind();
};

$(document).ready(function(){
  conferencePage();
});
