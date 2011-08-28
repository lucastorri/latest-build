require.paths.unshift(__dirname+'/lib');
var Conference = require('model')().Conference();

module.exports = function(app, nowjs) {
  var everyone = nowjs.getGroup('everyone');

  app.get('/conference/new', function(req, res){
    res.render('conference/new', {
      title : 'Conference'
    });
  });

  app.post('/conference', function(req, res){
    var conference = req.body.conference;
    console.log(Conference);
    res.json({id: 1037, title: 'encontro das bibas'} , 201);
  });

  app.put('/conference/:id', function(req, res){
    res.send({title: 'blah'}, { 'Content-Type': 'application/json' }, 400);
  });

  everyone.now.getConference = function() {
    this.now.receiveConference(stubConference());
  };

  app.get('/conference/view/:title', function(req, res){
    res.render('conference/view', {
      title : req.params.title
    });
  });

};

function stubConference() {
  return {
    title: 'JS Conf',
    talks: [
      stubTalk(1, 'Evented I/O for V8 javascript', new Date(2011, 10, 5, 9, 0), new Date(2011, 10, 5, 11, 0)),
      stubTalk(2, 'High performance web development for node.js', new Date(2011, 10, 5, 13, 0), new Date(2011, 10, 5, 17, 0)),
      stubTalk(3, 'MongoDB and node.js', new Date(2011, 10, 5, 17, 0), new Date(2011, 10, 5, 19, 0))
    ]
  }
}

function stubTalk(_id, title, start, end) {
  return {
    _id: _id,
    title: title,
    start: start,
    end: end,
    allDay: false
  }
}
