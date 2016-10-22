import { register } from './listeners';

import {
  LOAD_SCRIPT,
  SCRIPT_LOADED,
} from './constants';


function _loadScript(src) {
  return {
    type: LOAD_SCRIPT,
    src,
  };
}

export function loadScript(src) {
  return (dispatch) => {
    return new Promise((resolve) => {
      register(src, resolve);
      dispatch(_loadScript(src));
    });
  };
}

export function scriptLoaded(src) {
  return {
    type: SCRIPT_LOADED,
    src,
  };
}
