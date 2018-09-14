#!/bin/bash

cd js
npm install
cd ..
pip install -e .
jupyter nbextension install --py --sys-prefix mc_widget_periodictable
jupyter nbextension enable --py --sys-prefix mc_widget_periodictable
