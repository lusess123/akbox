import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = DefaultRouter;

let routes = [
  {
    "path": "/ak",
    "exact": false,
    "component": require('../ak/_layout.tsx').default,
    "routes": [
      {
        "component": () => React.createElement(require('/Users/zyking/gitdemo/akbox/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false }),
        "_title": "umihost",
        "_title_default": "umihost"
      }
    ],
    "_title": "umihost",
    "_title_default": "umihost"
  },
  {
    "path": "/akbox/aa",
    "exact": true,
    "component": require('../akbox/aa.jsx').default,
    "_title": "umihost",
    "_title_default": "umihost"
  },
  {
    "path": "/akbox",
    "exact": true,
    "component": require('../akbox/index.tsx').default,
    "_title": "umihost",
    "_title_default": "umihost"
  },
  {
    "path": "/akbox/todolist",
    "exact": true,
    "component": require('../akbox/todolist.tsx').default,
    "_title": "umihost",
    "_title_default": "umihost"
  },
  {
    "path": "/akbox/vm",
    "exact": true,
    "component": require('../akbox/vm.tsx').default,
    "_title": "umihost",
    "_title_default": "umihost"
  },
  {
    "path": "/",
    "exact": true,
    "component": require('../index.tsx').default,
    "_title": "umihost",
    "_title_default": "umihost"
  },
  {
    "component": () => React.createElement(require('/Users/zyking/gitdemo/akbox/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false }),
    "_title": "umihost",
    "_title_default": "umihost"
  }
];

export default function() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
