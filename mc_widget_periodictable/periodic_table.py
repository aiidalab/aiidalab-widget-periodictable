import ipywidgets as widgets
from traitlets import Unicode, Int #, List

@widgets.register
class PTableWidget(widgets.DOMWidget):
    """A widget to select chemical elements from a periodic table."""
    _view_name = Unicode('MCPTableView').tag(sync=True)
    _model_name = Unicode('MCPTableModel').tag(sync=True)
    _view_module = Unicode('mc-widget-periodictable').tag(sync=True)
    _model_module = Unicode('mc-widget-periodictable').tag(sync=True)
    _view_module_version = Unicode('^0.1.0').tag(sync=True)
    _model_module_version = Unicode('^0.1.0').tag(sync=True)
    selected_element = Unicode("test").tag(sync=True)
    age = Int(123).tag(sync=True)
