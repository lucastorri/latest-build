var express = require('express')
  , everyauth = require('everyauth')
  , conf = require('./conf');

var nextUserId = 0;
var usersByTwitId = {};
var usersById = {};

function addUser (source, sourceUser) {
  var user = usersById[++nextUserId] = {id: nextUserId};
  user[source] = sourceUser;
  return user;
}

everyauth
  .twitter
    .consumerKey(conf.twit.consumerKey)
    .consumerSecret(conf.twit.consumerSecret)
    .findOrCreateUser( function (sess, accessToken, accessSecret, twitUser) {
      return usersByTwitId[twitUser.id] || (usersByTwitId[twitUser.id] = addUser('twitter', twitUser));
    })
    .redirectPath('/');


var app = express.createServer(
    express.bodyParser()
  , express.static(__dirname + "/public")
  , express.cookieParser()
  , express.session({ secret: 'l47357'})
  , everyauth.middleware()
);

app.configure( function () {
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

everyauth.helpExpress(app);

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});



//== Routes =======================================

app.get('/t_auth', function (req, res) {
  res.render('home');
});

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.get('/conference/new', function(req, res){
  res.render('conference/new', {
    title : 'Conference'
  });
});

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);