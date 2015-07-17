define(['app/main', 'backbone', 'marionette', 'views/header', 'views/shoot'],
    function (App, Backbone, Marionette, header, shoot) {
    
       return Backbone.Marionette.Controller.extend({
            initialize:function (options) {
                App.headerRegion.show(new header());
            },
            //gets mapped to in AppRouter's appRoutes
            index: function () {
                App.settingsRegion.show(new shoot());
            }
        });

});
