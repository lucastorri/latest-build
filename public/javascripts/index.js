$(function() {
  
	now.ready(function() {
    now.getConference();
  });

  now.receiveConference = function(conference) {
    var firstConferenceDay = new Date(conference.talks[0].start);
    
      $('#calendar').fullCalendar({
        theme: true,
        header: false,
        allDaySlot: false,
        defaultView: 'agendaWeek',
        contentHeight: $(window).height() - 120,
        firstDay: firstConferenceDay.getDay(),
        events: conference.talks,
        eventClick: eventClick
      });
      
      $('#calendar').fullCalendar('gotoDate', firstConferenceDay);
  };
  
  function eventClick(calendarEvent, jsEvent) {
    var id = calendarEvent._id;
    $.get('/tweetalk/'+id, function(data) {
      data = $(data);
      var tt = tweetalk(id);
      var title = $('.title', data);
      title.hide();
      data.dialog({
        title: title.text(),
        position: [jsEvent.pageX, jsEvent.pageY],
        maxHeight: 400,
        maxWidth: 300,
        minHeight: 200,
        minWidth: 100,
        close: tt.close
      });
    });
  }

});
