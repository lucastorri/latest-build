$(function() {
  
	now.ready(function() {
    now.getConference();
  });
  
  now.receiveConference = function(conference) {
    var firstConferenceDay = new Date(conference.talks[0].start);
    
      $('#calendar').fullCalendar({
        theme: true,
        header: { left: '', center: 'prev title next', right: '' },
        allDaySlot: false,
        defaultView: 'agendaWeek',
        contentHeight: $(window).height() - 150,
        firstDay: firstConferenceDay.getDay(),
        events: conference.talks,
        eventClick: eventClick
      });
      
      $('#calendar').fullCalendar('gotoDate', firstConferenceDay);
  };
  
  function eventClick(calendarEvent, jsEvent) {
    var slug = calendarEvent.slug;
    $.get('/tweetalk/'+slug, function(data) {
      data = $(data);
      data.dialog({
        title: calendarEvent.title,
        position: [jsEvent.pageX, jsEvent.pageY]
      });
      tweetalk(slug);
    });
  }

});
