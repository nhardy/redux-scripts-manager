import { difference } from 'lodash';
import { Store } from 'redux';
import { scriptLoaded } from './actions';
import { initialState, IScriptsState } from './reducer';
import { notify } from './listeners';

/**
 * Registers redux-scripts-manager with the store
 * @param store Redux Store
 * @param key Reducer Key in Store
 */
export default function manager<S extends Store>(store: S, key = 'scripts') {
  let prevState = initialState;

  store.subscribe(() => {
    const state = store.getState()[key] as IScriptsState;
    if (state === prevState) return;
    const diff = difference(state.loading, prevState.loading);
    prevState = state;
    if (!diff.length) return;

    const head = document.querySelector('head')!;

    diff.forEach((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.async = true;

      const callbackName = state.callbacks[src];
      if (callbackName) {
        (window as any)[callbackName] = () => {
          store.dispatch(scriptLoaded(src));
          notify(src);
          delete (window as any)[callbackName];
        };
      } else {
        script.onload = () => {
          store.dispatch(scriptLoaded(src));
          notify(src);
        };
      }

      head.appendChild(script);
    });
  });
}
