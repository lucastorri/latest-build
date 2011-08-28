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
  
  function eventClick(calendarEvent) {
    var id = calendarEvent._id;
    $.get('/tweetalk/'+id, function(data) {
      $('body').append(data);
      tweetalk(id);
    });
  }

});
