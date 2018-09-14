var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');


// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var MCPTableModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _view_name : 'MCPTableView',
        _model_name : 'MCPTableModel',
        _model_module : 'mc-widget-periodictable',
        _view_module : 'mc-widget-periodictable',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0',
        age: 23,
        selected_element: 'test2'
    })
});


// Custom View. Renders the widget model.
var MCPTableView = widgets.DOMWidgetView.extend({
    my_template: _.template("<strong><%= selected_element %></strong> (<%= age %>)"),

    render: function() {
        this.selected_element_changed();
        this.model.on('change:selected_element', this.selected_element_changed, this);
    },

    selected_element_changed: function() {
        console.log("Here!")
        window.ggg = this.model;
        this.el.innerHTML = "AA: " + this.my_template(this.model.attributes);
        //this.el.textContent = "AA>" + this.my_template(this.model.attributes);
        
        //this.el.html(this.my_template(this.model.toJSON()));
        //this.el.textContent = this.model.get('selected_element');
    }
});

module.exports = {
    MCPTableModel : MCPTableModel,
    MCPTableView : MCPTableView
};
