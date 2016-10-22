import difference from 'lodash/difference';

import { scriptLoaded } from './actions';
import { initialState } from './reducer';
import { notify } from './listeners';


export default function manager(store, path = 'scripts') {
  let prevState = initialState;

  store.subscribe(() => {
    const state = store.getState()[path];
    if (state === prevState) return;
    const diff = difference(state.loading, prevState.loading);
    prevState = state;
    if (!diff.length) return;

    diff.forEach((src) => {
      const head = document.querySelector('head');
      const script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => {
        store.dispatch(scriptLoaded(src));
        notify(src);
      };
      head.appendChild(script);
    });
  });
}
