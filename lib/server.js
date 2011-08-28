module.exports = function(express, everyauth, nowjs, model, controllers) {
  var conf = require('conf');

  everyauth.twitter
    .consumerKey(conf.twitter.consumerKey)
    .consumerSecret(conf.twitter.consumerSecret)
    .findOrCreateUser( function (session, accessToken, accessSecret, twitUser) {
      return findOrCreateUser(twitUser, accessToken, accessSecret);
    })
    .redirectPath('/');

  var app = express.createServer(
      express.static(__dirname + "/../public")
    , express.cookieParser()
    , express.session({ secret: 'L47357' })
    , everyauth.middleware()
    , express.bodyParser()
  );
  app.set('view engine', 'jade');
  app.use(app.router);

  everyauth.helpExpress(app);
  var everyone = nowjs.initialize(app, { socketio: { 'log level': 2 } });

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  app.configure('production', function(){
    app.use(express.errorHandler());
  });

  app.listen(process.env.NODE_ENV === 'production' ? 80 : 7777, function() {
    // if run as root, downgrade to the owner of this file
    if (process.getuid() === 0)
      require('fs').stat(__filename, function(err, stats) {
        if (err) return console.log(err)
        process.setuid(stats.uid);
      });
  });

  var adr = app.address();
  var appUrl = 'http://' + adr.address + ((adr.port === 80) ? '' : ':' + adr.port) + '/';

  model = model(appUrl);

  controllers.forEach(function(controller) {
    controller({
      app: app,
      model: model,
      nowjs: nowjs
    });
  });

  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
};

var users = {};
var twitter = require('twitter');
function findOrCreateUser(twitUser, accessToken, accessSecret) {
  if (users[twitUser.id]) return users[twitUser.id];
  twitUser.twit = new twitter({
    access_token_key: accessToken,
    access_token_secret: accessSecret
  });
  twitUser.twit.verifyCredentials(function(data) {console.log(data)});
  return users[twitUser.id] = twitUser;
};