- To release a new version of aiidalab_widget_periodictable on PyPI:

Update _version.py (set release version, remove 'dev')
git add the _version.py file and git commit
`python setup.py sdist upload`
`python setup.py bdist_wheel upload`
`git tag -a X.X.X -m 'comment'`
Update _version.py (add 'dev' and increment minor)
git add and git commit
git push
git push --tags

- To release a new version of aiidalab-widget-periodictable on NPM:

```
# clean out the `dist` and `node_modules` directories
git clean -fdx
npm install
npm publish
```

- Additional material:

[An interesting link on how to publish](https://github.com/ocoudray/first-widget#4---publish-on-pypi-and-npm)
[A tutorial to author a custom jupyter widget](https://blog.jupyter.org/authoring-custom-jupyter-widgets-2884a462e724)