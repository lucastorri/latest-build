$(function() {
  
	now.ready(function() {
    var paths = window.location.pathname.split('/');
    var slug = paths[paths.length-1];
    now.getConference(slug);
  });

  now.receiveConference = function(conference) {
      
			conference.start = new Date(conference.start);
      $(conference.talks).each(function(index, talk) {
        talk.allDay = false;
      });
      
      $('#calendar').fullCalendar({
        theme: true,
        header: { left: '', center: 'prev title next', right: '' },
        allDaySlot: false,
        defaultView: 'agendaWeek',
        contentHeight: $(window).height() - 170,
        firstDay: conference.start.getDay(),
				firstHour: 8,
        events: conference.talks,
        eventClick: eventClick(conference)
      });
      
      $('#calendar').fullCalendar('gotoDate', conference.start);
  };
	
	function eventClick(conference) {
		return function(calendarEvent, jsEvent) {
			var confSlug = conference.slug;
      var talkSlug = calendarEvent.slug;
      var roomId = confSlug+'/'+talkSlug;
      $.get('/tweetalk/'+roomId, function(data) {
        data = $(data);
        var tt = tweetalk(roomId);
				var title = $('.title', data);
				title.hide();
				data.dialog({
          resizable: false,
					title: calendarEvent.title,
					position: [jsEvent.pageX, jsEvent.pageY],
					height: 400,
					width: 300,
					close: tt.close
				});
			});
		}
	}

});
