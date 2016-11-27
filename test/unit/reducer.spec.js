import reducer from 'src/reducer';
import {
  LOAD_SCRIPT,
  SCRIPT_LOADED,
} from 'src/constants';


describe('Reducer', () => {
  const src = 'https://example.org/script.js';

  it('should initialise with the default state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).to.deep.equal({
      loading: [],
      loaded: [],
      callbacks: {},
    });
  });

  it('should handle LOAD_SCRIPT correctly', () => {
    expect(reducer({
      loading: [],
      loaded: [],
      callbacks: {},
    }, { type: LOAD_SCRIPT, src })).to.deep.equal({
      loading: [src],
      loaded: [],
      callbacks: {
        [src]: undefined,
      },
    });
  });

  it('should handle LOAD_SCRIPT correctly when there is a duplicate', () => {
    expect(reducer({
      loading: [src],
      loaded: [],
      callbacks: {},
    }, { type: LOAD_SCRIPT, src })).to.deep.equal({
      loading: [src],
      loaded: [],
      callbacks: {
        [src]: undefined,
      },
    });
  });

  it('should handle LOAD_SCRIPT correctly when there is an onload prop', () => {
    const onload = '__rsmCallback';
    expect(reducer({
      loading: [],
      loaded: [],
      callbacks: {},
    }, { type: LOAD_SCRIPT, src, onload })).to.deep.equal({
      loading: [src],
      loaded: [],
      callbacks: {
        [src]: onload,
      },
    });
  });

  it('should handle SCRIPT_LOADED correctly', () => {
    expect(reducer({
      loading: [src],
      loaded: [],
      callbacks: {
        [src]: '__rsmCallback',
      },
    }, { type: SCRIPT_LOADED, src })).to.deep.equal({
      loading: [src],
      loaded: [src],
      callbacks: {
        [src]: undefined,
      },
    });
  });

  it('should not mutate the state for an unknown action', () => {
    const state = {
      some: 'property',
    };
    expect(reducer(state, { type: 'UNRELATED' })).to.equal(state);
  });

});
