import { uniq } from 'lodash';
import { AnyAction } from 'redux';
import {
  LOAD_SCRIPT,
  SCRIPT_LOADED,
} from 'src/constants';

export interface IScriptsState {
  loading: string[];
  loaded: string[];
  callbacks: {
    [src: string]: string;
  };
}

export const initialState: IScriptsState = {
  loading: [],
  loaded: [],
  callbacks: {},
};

/**
 * Redux Scripts Manager Reducer
 * @param state
 * @param action
 */
export default function reducer(state = initialState, action: AnyAction): IScriptsState {
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
