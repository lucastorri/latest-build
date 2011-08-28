module.exports = function(spec) {
  
  var app = spec.app;
  var model = spec.model;
  
  app.get('/', function(req, res) {
    model.findAllConferences(function(err, conferences) {
      res.render('index', {
        title: 'Twetalk',
        conferences: conferences,
        isHome: true
      });
    });
  });
  
  app.get('/about', function(req, res) {
    res.render('about', {
      title: 'Twetalk',
      isAbout: true
    });
  });
  
};