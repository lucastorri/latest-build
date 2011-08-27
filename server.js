var express = require('express')
  , everyauth = require('everyauth')
  , conf = require('./conf');

var nextUserId = 0;
var usersByTwitId = {};
var usersById = {};

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

everyauth
  .twitter
//    .myHostname('http://local.host:3000')
    .consumerKey(conf.twit.consumerKey)
    .consumerSecret(conf.twit.consumerSecret)
    .findOrCreateUser( function (sess, accessToken, accessSecret, twitUser) {
      return usersByTwitId[twitUser.id] || (usersByTwitId[twitUser.id] = addUser('twitter', twitUser));
    })
    .callbackPath('/auth/twitter/callback')
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

app.get('/', function (req, res) {
  res.render('home');
});

everyauth.helpExpress(app);

app.listen(parseInt(process.env.PORT) || 7777);
