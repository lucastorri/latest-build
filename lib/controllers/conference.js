require.paths.unshift(__dirname+'/lib');
var model = require('model')();
var Conference = model.Conference;

module.exports = function(app, nowjs) {
  var everyone = nowjs.getGroup('everyone');

  app.get('/conference/new', function(req, res){
    res.render('conference/new', {
      title : 'Conference'
    });
  });

  app.post('/conference', function(req, res){
    var conference = new Conference(req.body.conference);
    conference.save(function(err, doc){
      var code = err? 400 : 201;
      var toReturn = err? { original: conference, errors: err.errors } : conference
      res.json(toReturn, code);
    });
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
      stubTalk('evented-i-o-for-v8-javascript', 'Evented I/O for V8 javascript', new Date(2011, 10, 5, 9, 0), new Date(2011, 10, 5, 11, 0)),
      stubTalk('high-performance-web-development-for-node-js', 'High performance web development for node.js', new Date(2011, 10, 5, 13, 0), new Date(2011, 10, 5, 17, 0)),
      stubTalk('mongodb-and-node-js', 'MongoDB and node.js', new Date(2011, 10, 5, 17, 0), new Date(2011, 10, 5, 19, 0))
    ]
  }
}

function stubTalk(slug, title, start, end) {
  return {
    slug: slug,
    title: title,
    start: start,
    end: end,
    allDay: false
  }
}
