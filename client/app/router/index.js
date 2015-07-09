var beeline = require('beeline'),
    routes = {};

require('./login')(routes);
// require('./formRoutes')(routes);
// require('./paletteRoutes')(routes);
// require('./recordRoutes')(routes);
// require('./securityRoutes')(routes);

module.exports = beeline.route(routes);