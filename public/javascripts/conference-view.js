$(function() {
  
	now.ready(function() {
    var paths = window.location.pathname.split('/');
    var slug = paths[paths.length-1];
    now.getConference(slug);
  });

  now.receiveConference = function(conference) {
      
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
        events: conference.talks,
        eventClick: eventClick(conference)
      });
      
      $('#calendar').fullCalendar('gotoDate', conference.start);
  };
	
	function eventClick(conference) {
		return function(calendarEvent, jsEvent) {
			var slug = calendarEvent.slug;
			$.get('/tweetalk/'+slug, function(data) {
				data = $(data);
				var tt = tweetalk(slug);
				var title = $('.title', data);
				title.hide();
				data.dialog({
					title: calendarEvent.title,
					position: [jsEvent.pageX, jsEvent.pageY],
					maxHeight: 400,
					maxWidth: 300,
					minHeight: 200,
					minWidth: 100,
					close: tt.close
				});
			});
		}
	}

});
