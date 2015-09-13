define(['stache!app/components/compare/templates/screen-shot'], function(template) {
  var screenShot = Marionette.ItemView.extend({
    template: template,
  });
  return screenShot;
});
