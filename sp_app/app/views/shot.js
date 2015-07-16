define(['jquery', 'backbone', 'stache!app/templates/shot', 'models/shot'],
    function (jquery, Backbone, template, Shot) {
        //ItemView provides some default rendering logic
        var MyModel = Backbone.Model.extend({});
        var myModel = new Shot;
				myModel.set('foo', 'bar');
				myModel.save();
        return Backbone.Marionette.ItemView.extend({
            template: template,
            model: myModel
        });
    });
