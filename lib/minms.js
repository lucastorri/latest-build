var http = require('superagent');

var min = function(url, callback) {
  http
    .get('http://www.min.ms/api')
    .data({m: url})
    .end(function(err, data) {
      var shortned = (err) ? null : data.res.text;
      callback(err, shortned);
    });
}

module.exports = min;
