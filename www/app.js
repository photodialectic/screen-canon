// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: './libs',
    paths: {
        'app'         : '../app',
        'marionette'  : 'core/backbone.marionette',
        'routes'      : '../app/routes',
        'models'      : '../app/models',
        'controllers' : '../app/controllers',
        'views'       : '../app/views',
        'mustache'    : 'mustache',
        'stache'      : 'stache',
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['app/init']);
