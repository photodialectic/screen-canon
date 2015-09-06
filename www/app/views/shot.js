define(['jquery', 'backbone', 'underscore', 'stache!app/templates/shot', 'models/shot'],
  function(jquery, Backbone, _, template, Shot) {
    //ItemView provides some default rendering logic
    return Backbone.Marionette.ItemView.extend({
      template: template,
      loaded: function() {
        console.log('load')
      },
      events: {
        'load .preview': 'loaded'
      }
    });
  });
