module.exports = function(app) {
  app.get('/talk/new', function(req, res){
    res.render('talk/new', {
      title: 'talk',
      layout: false
    });
  });
};
