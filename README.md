aiidalab-widget-periodictable
=============================

A jupyter widget to select chemical elements from the periodic table

[![Binder](https://mybinder.org/badge.svg)](https://mybinder.org/v2/gh/aiidalab/aiidalab-widget-periodictable/master?urlpath=apps/widget-demo.ipynb)

Installation
------------

**NOTE**: this package is not yet on pip.

To install use pip:

    $ pip install aiidalab_widget_periodictable
    $ jupyter nbextension enable --py --sys-prefix aiidalab_widget_periodictable


For a development installation (requires npm),

    $ git clone https://github.com/materialscloud-org/aiidalab-widget-periodictable.git
    $ cd aiidalab-widget-periodictable
    $ cd js
    $ npm install
    $ cd ..
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix aiidalab_widget_periodictable
    $ jupyter nbextension enable --py --sys-prefix aiidalab_widget_periodictable

It is not clear if the `npm install` part is needed. Also, you can also simply call the `reinstall.sh` script that calls all the above steps.