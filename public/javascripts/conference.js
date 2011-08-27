var conference = function(){
  var bind = function(){
    $('#new_talk').click(function(e){
      $.ajax({
        url: '/talk/new',
        success: createTalk
      });
    });
  };

  var createTalk = function(html){
    $(html).dialog({
      buttons: {
        'save': function(){},
        'cancel': function(){}
      },
      modal: true,
      draggable: false,
      width: '550px',
      title: 'create a new talk'
    });
    $('#start').datetimepicker({
      ampm: true,
      separator: ' @ '
    });
    $('#end').datetimepicker({
      ampm: true,
      separator: ' @ '
    });
  };

  bind();
};

$(document).ready(function(){
  conference();
});
