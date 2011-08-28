var conference = function(){
  var bind = function(){
    form();
    talks();
  };
  bind();
};

var form = function(){
  var update = false;

  var bind = function(){
    ajaxify();
    $('#result').hide();
  };
  var ajaxify = function(){
    $('#conference').ajaxForm({
      success: function(res){ update? updated(res) : created(res); },
      error: function(res){
        res = $.parseJSON(res.responseText);
        update? failOnUpdate(res) : failOnCreate(res);
      }
    });
  };

  var created = function(res){
    $('#conference').attr('method', 'PUT').attr('action','/conference/'+res.id);
    success(res.title, 'created');
    $('#conference_button').attr('value', 'update');
    $('#conference').append('<input type="hidden" name="conference[id]" value="'+res.id+'" />');
    update = true;
  };

  var success = function(title, action){
    $('#result').text(title + ' successfully '+action).addClass('success').removeClass('fail').show();
  };

  var updated = function(res){
    success(res.title, 'updated');
  };

  var fail = function(title, action){
    $('#result').text('error '+ action + ' ' +title).addClass('fail').removeClass('success');
  };

  var failOnUpdate = function(res){
    fail(res.title, 'updating');
  };

  var failOnCreate = function(res){
    fail(res.title, 'creating');
  };

  bind();
};

var talks = function(){
 var enable= function(){
    $('#new_talk').click(function(e){
      $.ajax({
        url: '/talk/new',
        success: create
      });
    });
  };

  var create = function(html){
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

  enable();
};

$(document).ready(function(){
  conference();
});
