import isFunction from 'lodash/isFunction';
import sha1 from 'sha1';

import { register } from './listeners';
import {
  LOAD_SCRIPT,
  SCRIPT_LOADED,
  CALLBACKS_NAMESPACE,
} from './constants';


function _loadScript(src, callbackName) {
  return {
    type: LOAD_SCRIPT,
    src,
    callbackName,
  };
}

export function loadScript(src, callbackName = null) {
  return dispatch => new Promise((resolve) => {
    const isCustomCallbackName = isFunction(src);
    const _callbackName = callbackName || (isCustomCallbackName && `${CALLBACKS_NAMESPACE}${sha1(src(''))}`.substr(0, 16)) || null;
    const _src = isCustomCallbackName ? src(_callbackName) : src;
    register(_src, resolve);
    dispatch(_loadScript(_src, _callbackName));
  });
}

export function scriptLoaded(src) {
  return {
    type: SCRIPT_LOADED,
    src,
  };
}
