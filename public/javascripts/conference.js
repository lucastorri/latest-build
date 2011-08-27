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
      title: 'create a new talk',
      position: ['center', 50]
    });
    $('#start').datetimepicker({
      ampm: true,
      separator: ' @ '
    });
    $('#end').datetimepicker({
      ampm: true,
      separator: ' @ '
    });
    $('#authors').tagsInput({
      width: 205
    });
    $('#tracks').tagsInput({
      width: 205
    });
  };

  bind();
};

$(document).ready(function(){
  conference();
});
