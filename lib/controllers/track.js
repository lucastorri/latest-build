module.exports = function(app) {
  app.get('/conference/day/track/new', function(req, res){
    res.render('track/new', {
		layout: false
    });
  });
};