require.paths.unshift(__dirname+'/lib');

require('server')(
  require('express'),
  require('everyauth'),
  require('now'),
  // Controllers
<<<<<<< HEAD
  [
    require('controllers/index'),
    require('controllers/conference'),
    require('controllers/tweetalk')
=======
  ,[
    require('controllers/index')
   ,require('controllers/conference')
   ,require('controllers/talk')
>>>>>>> 6cfa631b9a9fcc16e778f1d406a281c6ed815478
  ]
);
