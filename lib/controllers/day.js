module.exports = function(app) {
  app.get('/conference/day/new', function(req, res){
    res.render('day/new', {
		layout: false
    });
  });
};