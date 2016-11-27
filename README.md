# Redux Scripts Manager

[![CircleCI](https://circleci.com/gh/nhardy/redux-scripts-manager.svg?style=shield&circle-token=c11fec3b5aa6a5743620a129b3ff06f8742b5f7d)](https://circleci.com/gh/nhardy/redux-scripts-manager)
[![Coverage Status](https://coveralls.io/repos/github/nhardy/redux-scripts-manager/badge.svg?branch=master)](https://coveralls.io/github/nhardy/redux-scripts-manager?branch=master)

This library allows for the management of dynamic script loading on the client with Redux.
This allows you to conditionally load scripts that don't always need to load on your site, like third party APIs for social media or maps.

## Peer Dependencies

Requires:
- [`redux`](http://reduxjs.org)
- [`redux-thunk`](https://github.com/gaearon/redux-thunk)

## Usage

```javascript
// Reducers file

import { combineReducers } from 'redux';
import { reducer as scripts } from 'redux-scripts-manager';


export default combineReducers({
  scripts, // If you're giving this an alternate key, make sure you use that key when you register with the store

  // Your reducers
});

```

```javascript
// Client entry point

import scriptsManager from 'redux-scripts-manager';


scriptsManager(store); // Register with the store. Optionally takes a second parameter for the key in the store

```

```javascript
// React component

import { loadScript } from 'redux-scripts-manager';

const src = '//example.org/path/to/script.js';

@connect(null, { loadScript })
export default class Thing Extends React.Component {
  componentDidMount() {
    this.props.loadScript(src).then(() => {
      // Do Some stuff
    });
  }
}
```

```javascript
// React component

import { loadScript } from 'redux-scripts-manager';

// For scripts which provide a JSONP callback parameter
const src = cb => `//example.org/path/to/script.js?onload=${cb}`;

@connect(null, { loadScript })
export default class Thing Extends React.Component {
  componentDidMount() {
    this.props.loadScript(src).then(() => {
      // Do Some stuff
    });
  }
}
```
