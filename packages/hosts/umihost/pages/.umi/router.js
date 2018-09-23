import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = DefaultRouter;

let routes = [
  {
    "path": "/akbox/aa",
    "exact": true,
    "component": require('../akbox/aa.jsx').default
  },
  {
    "path": "/akbox",
    "exact": true,
    "component": require('../akbox/index.tsx').default
  },
  {
    "path": "/akbox/todolist",
    "exact": true,
    "component": require('../akbox/todolist.tsx').default
  },
  {
    "path": "/akbox/vm",
    "exact": true,
    "component": require('../akbox/vm.tsx').default
  },
  {
    "path": "/",
    "exact": true,
    "component": require('../index.tsx').default
  },
  {
    "component": () => React.createElement(require('/Users/zyking/gitdemo/akbox/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false })
  }
];

export default function() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
