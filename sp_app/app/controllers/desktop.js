define(['app/main', 'backbone', 'marionette', 'views/header', 'views/shot'],
    function (App, Backbone, Marionette, header, shot) {
    
        return Backbone.Marionette.Controller.extend({
            initialize:function (options) {
                App.headerRegion.show(new header());
            },
            //gets mapped to in AppRouter's appRoutes
            index: function () {
                App.mainRegion.show(new shot());
            }
        });
});
