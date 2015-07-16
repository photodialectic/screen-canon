define(function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    var messages = require('./models/message');

    // Load library/vendor modules using
    // full IDs, like:
    var print = require('./models/print');

    print(messages.getHello());
});
