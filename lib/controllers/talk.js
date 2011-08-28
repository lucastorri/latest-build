module.exports = function(spec) {

  var app = spec.app;
  var model = spec.model;

  var Conference = model.Conference;
  var Talk = model.Talk;

  app.get('/conference/:id/talk/new', function(req, res){
    res.render('talk/new', {
      title: 'talk',
      layout: false,
      conf_id: req.params.id
    });
  });

  app.post('/conference/:id/talk', function(req, res){
    var talk = req.body.talk;
    talk.tags = talk.tags.split(',');
    talk.authors = talk.authors.split(',');
	talk.start = parseDate(talk.start);
    talk.end =  parseDate(talk.end);

    talk = new Talk(talk);

    Conference.findById(req.params.id, function(err, conference){
      conference.removePre('save');
      conference.talks.push(talk);
      conference.save(function(err){
        var code = err? 400 : 201;
        var toReturn = err? { original: talk, errors: err.errors } : talk
        res.json(toReturn, code);
      });
    });
  });

  app.del('/conference/:id/talk/:talk_id', function(req, res){
	Conference.findById(req.params.id, function(err, conference){
		var talkIndex = 0;
		conference.talks.forEach(function(talk, i){
			if (talk._id == req.params.id) {
				talkIndex = i;
			}
		});
		conference.talks = conference.talks.splice(talkIndex,1);
		conference.save(function(err){
			res.send(204);
		});
	});
  });
	
  var parseDate = function(stringDate){
	var noSpace = stringDate.replace(/\s/g,'');
	var date = noSpace.split('@')[0].split('/');
	var time = noSpace.split('@')[1];
	var pm = time.indexOf('pm') > -1;
	var hour = time.split(':')[0];
	if (pm) { 
		hour = hour + 12;
		if (hour == 24) hour = 0;
	};
	var minutes = time.split(':')[1].replace(/[apm]+/g, '');
	return new Date(date[2], date[0], date[1], hour, minutes, 0, 0);s
  }

};
