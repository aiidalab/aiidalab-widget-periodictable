// Export widget models and views, and the npm package version number.
require('./ptable.css')

module.exports = require('./ptable.js');
module.exports['version'] = require('../package.json').version;
