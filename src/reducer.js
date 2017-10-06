import uniq from 'lodash/uniq';

import {
  LOAD_SCRIPT,
  SCRIPT_LOADED,
} from './constants';


export const initialState = {
  loading: [],
  loaded: [],
  callbacks: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SCRIPT:
      return {
        ...state,
        loading: uniq([...state.loading, action.src]),
        callbacks: {
          ...state.callbacks,
          [action.src]: action.callbackName,
        },
      };

    case SCRIPT_LOADED:
      return {
        ...state,
        loaded: uniq([...state.loaded, action.src]),
        callbacks: {
          ...state.callbacks,
          [action.src]: undefined,
        },
      };

    default:
      return state;
  }
}
