module.exports = function(app) {

  app.get('/conference/new', function(req, res){
    res.render('conference/new', {
      title : 'Conference'
    });
  });

  app.post('/conference', function(req, res){
    res.json({id: 1037, title: 'encontro das bibas'} , 201);
  });

  app.put('/conference/:id', function(req, res){
    res.send({title: 'blah'}, { 'Content-Type': 'application/json' }, 400);
  });
};
