define(['app/main', 'jquery', 'backbone', 'underscore', 'stache!app/components/compare/templates/fieldset-urls', ],
  function(App, jquery, Backbone, _, template) {
    //ItemView provides some default rendering logic
    return Backbone.Marionette.ItemView.extend({
      template: template,
      tagName: 'fieldset',
      className: 'form-fieldset',
      initialize: function() {},
      new_url_fieldset: function(e) {},

      modelEvents: {
        "sync": "saved",
      },

      events: {
        // 'click js-add-new-url-fieldset': 'new_url_fieldset'
      }
    });
  });
