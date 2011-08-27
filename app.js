require.paths.unshift(__dirname+'/lib');

require('server')(
    require('express')
  , require('everyauth')

  // Controllers
  ,[
    require('controllers/index')
  , require('controllers/conference')
  ]
);