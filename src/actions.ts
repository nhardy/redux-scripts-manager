import { isFunction } from 'lodash';
import { Dispatch, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import sha256 from 'sha256';
import { register } from './listeners';
import {
  LOAD_SCRIPT,
  SCRIPT_LOADED,
  CALLBACKS_NAMESPACE,
} from './constants';

type IScriptSrcFunction = (callbackName: string) => string;
export type IScriptSrc = string | IScriptSrcFunction;

/**
 *
 * @param src
 * @param callbackName
 */
export function _loadScript(src: string, callbackName: string | null) {
  return {
    type: LOAD_SCRIPT,
    src,
    callbackName,
  };
}

/**
 * Loads the given script and returns a Promise which resolves upon its completion
 * @param src
 * @param callbackName
 */
export function loadScript<S = {}, >(
  src: IScriptSrc,
  callbackName: string | null = null,
): ThunkAction<Promise<void>, S, undefined, AnyAction> {
  return (dispatch: Dispatch) => new Promise((resolve) => {
    const isCustomCallbackName = isFunction(src);
    const _callbackName = callbackName || (
      isCustomCallbackName && `${CALLBACKS_NAMESPACE}${sha256((src as IScriptSrcFunction)(''))}`.substr(0, 16)
    ) || null;
    const _src = isCustomCallbackName ? (src as IScriptSrcFunction)(_callbackName!) : src as string;
    register(_src, resolve);
    dispatch(_loadScript(_src, _callbackName));
  });
}

/**
 * Creates an action which indicates that the given script has loaded
 * @param src
 */
export function scriptLoaded(src: string) {
  return {
    type: SCRIPT_LOADED,
    src,
  };
}
