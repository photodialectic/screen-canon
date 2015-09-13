define(['app/main', 'backbone', 'marionette', 'views/header', 'views/shoot', 'components/compare/main'],
  function(App, Backbone, Marionette, header, shoot, compare) {

    return Backbone.Marionette.Controller.extend({
      initialize: function(options) {
        App.headerRegion.show(new header());
      },
      //gets mapped to in AppRouter's appRoutes
      shoot: function() {
        App.settingsRegion.show(new shoot());
      },
      compare: function() {
        App.settingsRegion.show(new compare());
      }
    });

  });
