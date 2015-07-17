define(['jquery', 'backbone', 'stache!app/templates/header'],
    function (jquery, Backbone, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: template,
        });
    });
