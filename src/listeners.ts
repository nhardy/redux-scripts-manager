import { includes } from 'lodash';

const listeners: { [src: string]: Array<() => void> } = {};
const loaded: string[] = [];

/**
 * For a given script, fires all listeners and removes them from the list
 * @param src
 */
function fire(src: string) {
  let listener;
  // eslint-disable-next-line no-cond-assign
  while ((listener = listeners[src].pop())) {
    listener();
  }
}

/**
 * Adds a callback for the given script to be called when the script has been loaded (or immediately calls if the
 * script has already been loaded)
 * @param src
 * @param callback
 */
export function register(src: string, callback: () => void) {
  if (includes(loaded, src)) {
    callback();
    return;
  }
  listeners[src] = listeners[src] || [];
  listeners[src].push(callback);
}

/**
 * Adds the script to the list of loaded scripts and notifies the listeners
 * @param src
 */
export function notify(src: string) {
  loaded.push(src);
  fire(src);
}
