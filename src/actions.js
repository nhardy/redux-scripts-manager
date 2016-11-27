import isFunction from 'lodash/isFunction';
import sha1 from 'sha1';

import { register } from './listeners';
import {
  LOAD_SCRIPT,
  SCRIPT_LOADED,
  CALLBACKS_NAMESPACE,
} from './constants';


function _loadScript(src, onload) {
  return {
    type: LOAD_SCRIPT,
    src,
    onload: onload || undefined,
  };
}

export function loadScript(src) {
  return (dispatch) => {
    return new Promise((resolve) => {
      const onload = isFunction(src) && `${CALLBACKS_NAMESPACE}${sha1(src(''))}`.substr(0, 16);
      const _src = onload ? src(onload) : src;
      register(_src, resolve);
      dispatch(_loadScript(_src, onload));
    });
  };
}

export function scriptLoaded(src) {
  return {
    type: SCRIPT_LOADED,
    src,
  };
}
