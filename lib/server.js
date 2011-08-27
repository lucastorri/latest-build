module.exports = function(express, everyauth, nowjs, controllers) {
  var conf = require('conf');
  everyauth.twitter
    .consumerKey(conf.twitter.consumerKey)
    .consumerSecret(conf.twitter.consumerSecret)
    .findOrCreateUser( function (session, accessToken, accessSecret, twitUser) {
      return usersByTwitId[twitUser.id] || (usersByTwitId[twitUser.id] = addUser('twitter', twitUser));
    })
    .redirectPath('/');
  
  var app = express.createServer(
      express.static(__dirname + "/../public")
    , express.cookieParser()
    , express.session({ secret: 'L47357' })
    , everyauth.middleware()
  );
  app.set('view engine', 'jade');
  app.use(app.router);

  everyauth.helpExpress(app);

  controllers.forEach(function(controller) {
    controller(app, nowjs);
  })

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  app.configure('production', function(){
    app.use(express.errorHandler());
  });
  
  app.listen(parseInt(process.env.PORT) || 7777);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
};

var nextUserId = 0;
var usersByTwitId = {};
var usersById = {};
function addUser (source, sourceUser) {
  var user = usersById[++nextUserId] = {id: nextUserId};
  user[source] = sourceUser;
  return user;
}