aiidalab-widget-periodictable
=============================

**NOTE!! THIS HAS BEEN SUPERSEDED BY [THE WIDGET-PERIODICTABLE](https://github.com/osscar-org/widget-periodictable) DEVELOPED BY THE OSSCAR PROJECT!!**

A jupyter widget to select chemical elements from the periodic table

[![Binder](https://mybinder.org/badge.svg)](https://mybinder.org/v2/gh/aiidalab/aiidalab-widget-periodictable/master?urlpath=apps/widget-demo.ipynb)

Installation
------------

**NOTE**: this package is not yet on pip.

To install use pip:

    $ pip install aiidalab_widget_periodictable
    $ jupyter nbextension enable --py --sys-prefix aiidalab_widget_periodictable


For a development installation (requires npm),

    $ git clone https://github.com/aiidalab/aiidalab-widget-periodictable.git
    $ cd aiidalab-widget-periodictable
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix aiidalab_widget_periodictable
    $ jupyter nbextension enable --py --sys-prefix aiidalab_widget_periodictable

Alternatively, you can also simply call the `reinstall.sh` script that calls the last three steps.

After this, you need both to refresh the page, and restart the kernel.

If you just changed the JS part, you can run a bit faster by running only
the `./jsonlyreinstall.sh` script and then refreshing the page.
