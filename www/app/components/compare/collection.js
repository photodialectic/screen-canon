define(["jquery", "backbone", "components/compare/model"],
  function($, Backbone, model) {
    // Creates a new Backbone Model class object
    var Collection = Backbone.Collection.extend({

      model: model,

    });

    // Returns the Model class
    return Collection;

  }

);
