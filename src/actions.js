import {
  LOAD_SCRIPT,
  SCRIPT_LOADED,
} from './constants';


export function loadScript(src) {
  return {
    type: LOAD_SCRIPT,
    src,
  };
}

export function scriptLoaded(src) {
  return {
    type: SCRIPT_LOADED,
    src,
  };
}
