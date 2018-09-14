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
    })
});


// Custom View. Renders the widget model.
var MCPTableView = widgets.DOMWidgetView.extend({
    // Todo: put around a div with type 'table' and one with type 'table row'
    //my_template: _.template('<span class="periodic-table-entry"><strong><%= selected_element %></strong> (<%= age %>)</span>'),
    cell_template: _.template('<span class="periodic-table-entry noselect element-<%= elementName %><% if (selectedElements.includes(elementName)) { print(" elementOn"); } %>"><%= elementName %></span>'),

    render: function() {
        this.selected_elements_changed();
        this.model.on('change:selected_elements', this.selected_elements_changed, this);
    },

    events: {
        "click .periodic-table-entry": "toggleElement"
    },

    toggleElement: function(event) {
        var elementName = undefined;
        var isOn = false;
        for (let classElem of event.target.classList) {
            if (classElem.startsWith('element-')) {
                elementName = classElem.slice("element-".length);
            }
            if (classElem == "elementOn") {
                isOn = true;
            }
        }

        if (typeof elementName !== 'undefined') {
            var currentList = this.model.get('selected_elements');
            // NOTE! it is essential to duplicate the list,
            // otherwise the value will not be updated.
            var newList = currentList.slice();

            // Should we rather just change the 'selected_elements'
            // value and call the render function again?
            if (isOn) {
                var index = newList.indexOf(elementName);
                if (index > -1) {
                    newList.splice(index, 1);
                }
                event.target.classList.remove('elementOn');
            } else {
                newList.push(elementName);
                event.target.classList.add('elementOn');
            }

            this.model.set('selected_elements', newList);
            this.touch();
        }
    },

    selected_elements_changed: function() {
        console.log("Here!");
        var selectedElements = this.model.get('selected_elements');
        console.log(selectedElements);
        // NEXT LINE: DEBUG
        window.ggg = this.model;
        // TODO: There is for sure a way to do to loops in the template, fix this
        this.el.innerHTML = '<div class="periodic-table-body">' +
            '<div class="periodic-table-row">' +
                this.cell_template({elementName: 'H', selectedElements: selectedElements})+
                this.cell_template({elementName: 'He', selectedElements: selectedElements})+
            '</div>' +
            '<div class="periodic-table-row">' +
                this.cell_template({elementName: 'Li', selectedElements: selectedElements})+
                this.cell_template({elementName: 'Ne', selectedElements: selectedElements})+
            '</div>' +
            '</div>';
    }
});

module.exports = {
    MCPTableModel : MCPTableModel,
    MCPTableView : MCPTableView
};
