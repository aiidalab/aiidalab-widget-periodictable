from ._version import version_info, __version__

from .periodic_table import *

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'aiidalab-widget-periodictable',
        'require': 'aiidalab-widget-periodictable/extension'
    }]
