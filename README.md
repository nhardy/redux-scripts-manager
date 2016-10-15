# Redux Scripts Manager

Manage dynamic script loading with Redux.
This package is a work-in-progress and its API and usage is subject to change. Use at your own risk.

## Usage

```javascript
// Reducers file

import { combineReducers } from 'redux';
import { reducer as scripts } from 'redux-scripts-manager';


export default combineReducers({
  scripts,

  // Your reducers
});

```

```javascript
// Client entry point

import scriptsManager from 'redux-scripts-manager';


scriptsManager(store); // Register with the store

```

```javascript
// React component

import { loadScript } from 'redux-scripts-manager';

const src = '//example.org/path/to/script.js';

@connect((state) => ({
  scriptLoaded: state.scripts.loaded.includes(src),
}), { loadScript })
export default class Thing Extends React.Component {
  componentDidMount() {
    this.props.loadScript(src);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loaded && this.props.loaded) {
      // Do stuff with the newly loaded script
    }
  }
}


```
