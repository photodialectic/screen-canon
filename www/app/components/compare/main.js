define([
    'app/main',
    'jquery',
    'backbone',
    'underscore',
    'stache!app/components/compare/templates/layout',
    'components/compare/views/fieldset-urls',
    'components/compare/views/screen-shot',
    'components/compare/model',
    'components/compare/collection'
  ],
  function(App, jquery, Backbone, _, template, urlsView, screenShotView, model, collection) {
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
      shoot: function(e) {
        e.preventDefault();
        var collection = this.parseFormData();
        var requests = collection.groupBy('url');
        var screenShot = new screenShotView();
        screenShot.collection = collection;
        App.renderRegion.show(screenShot);
        _.each(requests, function(obj) {
          _.each(obj, function(request) {
            request.save({}, {
              success: function(model, response) {
                _.each(response.items, function(item) {
                  jQuery('#shot-' + model.get('my_id')).html(jQuery('<a/>').attr({
                    'href': '/static/shots/' + item.filename,
                    'target': '_blank'
                  }).text(item.filename));
                })
              }
            });
          });
        });
      },
      parseFormData: function() {
        var url, platform, env, id, requests = new collection();
        id = parseInt(jQuery('input[name="id"]').val());
        _.each(jQuery('input[name="url"]').serializeArray(), function(obj) {
          url = obj.value;
          _.each(jQuery('input[name="environment"]').serializeArray(), function(obj) {
            env = obj.value;
            _.each(jQuery('input[name="platform"]').serializeArray(), function(obj) {
              platform = obj.value;
              var shot = new model({
                'my_id': id,
                'url': url,
                'enviroment': env,
                'platform': platform
              });
              jQuery('input[name="id"]').val(++id);
              requests.push(shot);
            })
          });
        });
        return requests;
      },

      modelEvents: {
        "sync": "saved",
      },
      events: {
        'click .js-add-new-url-fieldset': 'insert_fieldset_url',
        'click .js-shoot': 'shoot'
      }
    });
  });
