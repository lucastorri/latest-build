require.paths.unshift(__dirname+'/lib');
module.exports = function(spec) {

  var app = spec.app;
  var model = spec.model;
  var Conference = model.Conference;
  var Talk = model.Talk;

  var nowjs = spec.nowjs;
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
    var conference = req.body.conference;
    Conference.update({'_id': req.params.id}, conference, function(err){
      var code = err? 400 : 200;
      var toReturn = err? { original: conference, errors: err.errors } : conference
      res.json(toReturn, code);
    });
  });

  everyone.now.getConference = function(slug) {
    var now = this.now;
    model.findConference(slug, function(err, conference) {
      now.receiveConference(conference);
    });
  };

  app.get('/conference/view/:slug', function(req, res) {
    model.findConference(req.params.slug, function(err, conference) {
      res.render('conference/view', {
        title: conference.title,
        conference: conference
      });
    });
  });

  var talkPlaceholder = function(){
	var agilevale1 = new Talk();
	agilevale1.title = 'placeholder';
	agilevale1.start = new Date(2011, 8, 5, 9, 30, 0, 0);
	agilevale1.end = new Date(2011, 8, 5, 10, 20, 0, 0);
	return agilevale1;
   }

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

