define(['app/main', 'jquery', 'backbone', 'underscore', 'stache!app/templates/shoot', 'models/shot', 'views/shot'],
  function(App, jquery, Backbone, _, template, Shot, shotView) {
    //ItemView provides some default rendering logic
    var shot = new Shot();
    return Backbone.Marionette.ItemView.extend({
      template: template,
      model: shot,
      new: function(e) {
        e.preventDefault();
        shot.clear();
        _.each(jquery('#settings').serializeArray(), function(data) {
          shot.set(data.name, data.value);
        });
        shot.save();

      },
      saved: function() {
        var shootView = new shotView();
        shootView.model = shot;
        App.renderRegion.show(shootView);
      },

      modelEvents: {
        "sync": "saved",
      },
      events: {
        'click .js-shoot': 'new'
      }
    });
  });
