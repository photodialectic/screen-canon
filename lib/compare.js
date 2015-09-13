var express = require('express'),
  app = express(),
  Pageres = require('pageres');

module.exports = {
  pageres: '',
  environments: {
    'dev': 'dev.buzzfeed.com',
    'stage': 'stage.buzzfeed.com',
    'prod': 'www.buzzfeed.com',
  },
  platforms: {
    'mob_web': {
      'viewport': '375x667',
      'user_agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
    },
    'dskp_web': {
      'viewport': '1024x768',
      'user_agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    },
    'anrd_bf_app': {
      'viewport': '360x640',
      'user_agent': 'Mozilla/5.0 (Linux; Android 5.1; Nexus 5 Build/LMY47D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/42.0.2311.129 Mobile Safari/537.36 BuzzFeed/40000',
    },
    'anrd_bf_app_news': {
      'viewport': '360x640',
      'user_agent': 'Mozilla/5.0 (Linux; Android 5.1; Nexus 5 Build/LMY47D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/42.0.2311.129 Mobile Safari/537.36 BFNews/40000',
    },
    'ios_bf_app': {
      'viewport': '375x667',
      'user_agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12F70 BuzzFeed/40000',
    },
    'ios_bf_app_news': {
      'viewport': '375x667',
      'user_agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12F70 BFNews/40000',
    }
  },
  setup: function(opts) {
    this.pageres = new Pageres();
    var viewport = this.platforms[opts.platform]['viewport'];
    var options = {
      fileName: '<%= url %>_' + opts.platform,
      userAgent: this.platforms[opts.platform]['user_agent'],
      username: 'mrdev77',
      password: 'viral'
    }
    this.pageres.src(opts.url, [viewport], options).dest('public/shots');
  }
};
