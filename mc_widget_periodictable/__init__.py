from ._version import version_info, __version__

from .periodic_table import *

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'mc-widget-periodictable',
        'require': 'mc-widget-periodictable/extension'
    }]
