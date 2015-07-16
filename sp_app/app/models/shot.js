define(["jquery", "backbone"],
    function($, Backbone) {
        // Creates a new Backbone Model class object
        var Model = Backbone.Model.extend({

            url: '/shot',

            // Model Constructor
            initialize: function() {

            },

            // Default values for all of the Model attributes
            defaults: {
                url: 'http://www.buzzfeed.com/indexbeta',
                selector: '#hotonbuzzfeed',
                viewport: '1280x1024'
            },

            // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
            validate: function(attrs) {

            }

        });

        // Returns the Model class
        return Model;

    }

);
