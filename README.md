# Redux Scripts Manager

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
