module.exports = function(app) {
  app.get('/conference/day/track/talk/new', function(req, res){
    res.render('talk/new', {
		layout: false
    });
  });
};