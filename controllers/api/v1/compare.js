var express = require('express'),
  router = express.Router(),
  compare = require('../../../lib/compare'),
  URL = require('url'),
  config = require('config');

router.post('/', function(req, res) {
  var url = req.param('url');
  url = 'http' == url.substr(0, 4) ? url : 'http://' + url;

  var parsed = URL.parse(url, true);
  var pathname = parsed.pathname;
  if ('/bf2/' == pathname.substr(0, 5) && 'dev' !== req.param('enviroment')) {
    // strip it
    pathname = pathname.substr(4);
  } else if ('dev' == req.param('enviroment') && '/bf2/' != pathname.substr(0, 5)) {
    pathname = '/bf2' + pathname;
    pathname = '/bf2/' == pathname ? pathname + 'index' : pathname;
  }

  var newUrl = URL.format({
    protocol: parsed.protocol,
    pathname: pathname,
    hostname: compare.environments[req.param('enviroment')],
    search: parsed.search
  })
  compare.setup({
    url: newUrl,
    platform: req.param('platform'),
  })

  compare.pageres.run(function(err, items) {
    if (!err) {
      res.json({
        'items': items
      });
    }
  })
});

module.exports = router
