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
    $('#result a').click(function(e){
      e.preventDefault();
      $('#result').hide();
    })
  };
  var ajaxify = function(){
    $('#conference').ajaxForm({
      success: function(res){update? updated(res) : created(res); },
      error: function(res){
        res = $.parseJSON(res.responseText);
        update? failOnUpdate(res) : failOnCreate(res);
      }
    });
  };

  var created = function(res){
    $('#conference').attr('method', 'PUT').attr('action','/conference/'+res._id);
    success(res.title, 'created');
    $('#conference_button').attr('value', 'update');
    $('#conference').append('<input type="hidden" name="conference[id]" value="'+res._id+'" />');
    update = true;
    conferenceId = res._id;
  };

  var success = function(title, action){
    $('#result').addClass('success').removeClass('error').show();
    $('#result p.message').text(title + ' successfully '+action);
  };

  var updated = function(res){
    success(res.title, 'updated');
  };

  var fail = function(title, action){
    $('#result').addClass('error').removeClass('success').show();
    $('#result p.message').text('error '+ action + '. You should supply a title.');
  };

  var failOnUpdate = function(res){
    console.log(res);
    var title = res.original.title;
    fail(title? title : '', 'updating');
  };

  var failOnCreate = function(res){
    fail(res.original.title, 'creating');
  };

  bind();
};

var talks = function(){
 var enable= function(){
    $('#new_talk').click(function(e){
      if (conferenceId){
        $.ajax({
          url: '/conference/'+conferenceId+'/talk/new',
          success: create
        });
      }
    });
  };

  var create = function(html){
    dialog(html);
    createPickers(html);
    createTags(html);
    ajaxify(html);
   };

  var ajaxify = function(html){
    $('#form_talk').ajaxForm(function(res){
      insertTalk(res);
    });
  };
  
  var insertTalk = function(talk){
	$('#talks_table tbody').append('<tr id="'+talk._id+'_row"><td>'+talk.title+'</td> <td>'+showDate(talk.start)+'</td> <td>'+showDate(talk.end)+'</td> <td>'+talk.authors.join(',')+'</td> <td>'+talk.tags.join(',')+'</td> </tr>')
  	//feature toggle enableRemoveTalk(talk._id);
  };

  var showDate = function(sdate){
	var date = sdate.split('T')[0].split('-'); //year, month, day
	var time = sdate.split('T')[1].match(/[\d]{2}:[\d]{2}/);
	date = [date[1], date[2], date[0]].join('/');
	return date + ' @ ' + time;
  }

  var enableRemoveTalk = function(id){
	$('#'+id).click(function(e){
		e.preventDefault();
		$.ajax({
			url: '/conference/'+conferenceId+'/talk/'+id,
			type: 'DELETE',
			success: removeTalk(id)
		})
	});
  }

  var removeTalk = function(id){
	$('#'+id+'_row').remove();
  }

  var createTags = function(html){
    var config = {width: 205};
    $('#authors').tagsInput(config);
    $('#tracks').tagsInput(config);
  };

  var createPickers = function(html){
    var config = {ampm: false, separator: ' @ '};
    $('.start').datetimepicker(config);
    $('.end').datetimepicker(config);
  };

  var dialog = function(content){
   $(content).dialog({
      buttons: {
        'save': function(){ $('#form_talk').submit(); $(this).dialog('close'); },
        'cancel': function(){ $(this).dialog('close'); }
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
