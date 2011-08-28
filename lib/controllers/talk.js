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
};
