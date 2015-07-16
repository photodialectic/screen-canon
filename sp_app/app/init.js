// Include Desktop Specific JavaScript files here (or inside of your Desktop Controller, or differentiate based off App.mobile === false)
require(["app/main", "routes/routes", "controllers/desktop"],
  function (App, AppRouter, AppController) {
      App.appRouter = new AppRouter({
          controller:new AppController()
      });
      // Start Marionette Application in desktop mode (default)
      App.start();

  });
