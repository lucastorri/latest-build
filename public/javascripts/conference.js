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
    dialog(html);
    createPickers(html);
    createTags(html);
   };

  var createTags = function(html){
    var config = {width: 205};
    $('#authors').tagsInput(config);
    $('#tracks').tagsInput(config);
  };

  var createPickers = function(html){
    var config = {ampm: true, separator: ' @ '};
    $('.start').datetimepicker(config);
    $('.end').datetimepicker(config);
  };

  var dialog = function(content){
     $(content).dialog({
        buttons: {
          'save': function(){},
          'cancel': function(){}
        },
        modal: true,
        draggable: false,
        width: '550px',
        title: 'create a new talk',
        position: ['center', 50],
        resizable: false,
        close: cleanup
     });
  };

  var cleanup = function(){
    $('.ui-dialog').remove();
    $('.talk_form').remove();
  };

  bind();
};

$(document).ready(function(){
  conference();
});
