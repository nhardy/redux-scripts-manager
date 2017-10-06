import includes from 'lodash/includes';


const listeners = {};
const loaded = [];

function fire(src) {
  let listener;
  // eslint-disable-next-line no-cond-assign
  while ((listener = listeners[src].pop())) {
    listener();
  }
}

export function register(src, callback) {
  if (includes(loaded, src)) {
    callback();
    return;
  }
  listeners[src] = listeners[src] || [];
  listeners[src].push(callback);
}

export function notify(src) {
  loaded.push(src);
  fire(src);
}
