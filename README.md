mc-widget-periodictable
========================

A simple widget to select elements from the periodic table

[![Binder](https://mybinder.org/badge.svg)](https://mybinder.org/v2/gh/materialscloud-org/mc-widget-periodictable/master?urlpath=apps/ptable-widget-demo.ipynb)

Installation
------------

To install use pip:

    $ pip install mc_widget_periodictable
    $ jupyter nbextension enable --py --sys-prefix mc_widget_periodictable


For a development installation (requires npm),

    $ git clone https://github.com/materialscloud-org/mc-widget-periodictable.git
    $ cd mc-widget-periodictable
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix mc_widget_periodictable
    $ jupyter nbextension enable --py --sys-prefix mc_widget_periodictable
