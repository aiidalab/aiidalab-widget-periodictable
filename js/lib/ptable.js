var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');

var elementTable = [
    ["H", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "He"],
    ["Li", "Be", "", "", "", "", "", "", "","", "", "", "B", "C", "N", "O", "F", "Ne"],
    ["Na", "Mg", "", "", "", "", "", "", "","", "", "", "Al", "Si", "P", "S", "Cl", "Ar"],
    ["K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co","Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"],
    ["Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh","Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe"],
    ["Cs", "Ba", "*", "Hf", "Ta", "W", "Re", "Os", "Ir","Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn"],
    ["Fr", "Ra", "*", "Rf", "Db", "Sg", "Bh", "Hs", "Mt","Ds", "Rg", "Cn", "Nh", "Fi", "Mc", "Lv", "Ts", "Og"],
    ["", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", ""],
    ["", "", "*", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu","Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu"],
    ["", "", "*", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am","Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr"]    
];

var elementList = [];
for (let elementRow of elementTable) {
    for (let elementName of elementRow) {
        if ( (elementName === "") || (elementName == "*" ) ) {
        }
        else {
            elementList.push(elementName);
        }
    }
}

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
        _model_module : 'aiidalab-widget-periodictable',
        _view_module : 'aiidalab-widget-periodictable',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0',
    })
});


// Custom View. Renders the widget model.
var MCPTableView = widgets.DOMWidgetView.extend({
    // TODO: move template to external file to make it more readable, see
    // http://codebeerstartups.com/2012/12/how-to-improve-templates-in-backbone-js-learning-backbone-js/
    tableTemplate: _.template(
        '<% for (let elementRow of elementTable) { print("<div class=\'periodic-table-row\'>"); for (let elementName of elementRow) { if ( (elementName === "") || (elementName == "*" ) ) { %>' +
        '  <span class="periodic-table-empty noselect"><%= elementName %></span>' +
        '<% } else { %>' +
        '  <span class="<% if (disabledElements.includes(elementName)) { print(" periodic-table-disabled"); } else { print(" periodic-table-entry"); }%> noselect element-<%= elementName %><% if (selectedElements.includes(elementName) && (! disabledElements.includes(elementName)) ) { print(" elementOn"); } %>"><%= elementName %></span>' +
        '<% } }; print("</div>"); } %>'
    ),

    render: function() {
        this.selected_elements_changed();
        this.model.on('change:selected_elements', this.selected_elements_changed, this);
        this.model.on('change:disabled_elements', this.disabled_elements_changed, this);
    },

    events: {
        "click .periodic-table-entry": "toggleElement"
    },

    toggleElement: function(event) {
        var elementName = undefined;
        var isOn = false;
        var isDisabled = false;
        for (let classElem of event.target.classList) {
            if (classElem.startsWith('element-')) {
                elementName = classElem.slice("element-".length);
            }
            if (classElem == "elementOn") {
                isOn = true;
            }
            if (classElem == "periodic-table-disabled") {
                isDisabled = true;
            }
        }
        if (isDisabled) return;

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

    disabled_elements_changed: function() {
        this.selected_elements_changed();
    },

    selected_elements_changed: function() {
        var selectedElements = this.model.get('selected_elements');
        var disabledElements = this.model.get('disabled_elements');
        var newSelectedElements = selectedElements.slice();

        var changed=false;
        // Remove disabled elements
        for (let elementName of disabledElements) {
            if (newSelectedElements.includes(elementName)) {
                var index = newSelectedElements.indexOf(elementName);
                if (index > -1) {
                    newSelectedElements.splice(index, 1);
                    changed = true;
                }
            }
        }
        // Remove unknown elements
        for (let elementName of newSelectedElements) {
            if (!elementList.includes(elementName)) {
                var index = newSelectedElements.indexOf(elementName);
                if (index > -1) {
                    newSelectedElements.splice(index, 1);
                    changed = true;
                }
            }
        }
        // call the update only if I actually removed something
        if (changed) {
            // Make a copy before setting
            this.model.set('selected_elements', newSelectedElements);
            this.touch();
        }
        
        this.el.innerHTML = '<div class="periodic-table-body">' +
            this.tableTemplate({
                elementTable: elementTable, 
                selectedElements: newSelectedElements,
                disabledElements: disabledElements
            }) +
            '</div>';
    }
});

module.exports = {
    MCPTableModel : MCPTableModel,
    MCPTableView : MCPTableView
};
