module.exports = function(app) {
  app.get('/', function(req, res){
    res.render('index', {
      title: 'Express'
    });
  });

  app.get('/t_auth', function (req, res) {
    res.render('home');
  });
};