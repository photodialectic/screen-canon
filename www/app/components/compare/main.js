define(['app/main', 'jquery', 'backbone', 'underscore', 'stache!app/components/compare/templates/layout', 'components/compare/views/fieldset-urls'],
  function(App, jquery, Backbone, _, template, urlsView) {
    //ItemView provides some default rendering logic
    return Backbone.Marionette.ItemView.extend({
      template: template,
      onRender: function() {
        this.insert_fieldset_url();
      },
      new: function(e) {},
      insert_fieldset_url: function(e) {
        if (e) {
          e.preventDefault();
        }
        var urlsForm = new urlsView();
        urlsForm.$el.insertBefore(this.$el.find('.js-add-new-url-fieldset'));
        urlsForm.render();
      },

      modelEvents: {
        "sync": "saved",
      },

      events: {
        'click .js-add-new-url-fieldset': 'insert_fieldset_url'
      }
    });
  });
