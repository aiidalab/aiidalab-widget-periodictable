#!/bin/bash

#cd js
#npm install
#cd ..
pip install -e .
jupyter nbextension install --py --symlink --sys-prefix aiidalab_widget_periodictable
jupyter nbextension enable --py --sys-prefix aiidalab_widget_periodictable
