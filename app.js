require.paths.unshift(__dirname+'/lib');

require('server')(
  require('express'),
  require('everyauth'),
  require('now'),
  // Controllers
  [
    require('controllers/index'),
    require('controllers/conference'),
    require('controllers/tweetalk'),
    require('controllers/talk')
  ]
);