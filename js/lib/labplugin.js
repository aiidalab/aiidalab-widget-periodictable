var mc-widget-periodictable = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'mc-widget-periodictable',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'mc-widget-periodictable',
          version: mc-widget-periodictable.version,
          exports: mc-widget-periodictable
      });
  },
  autoStart: true
};

