import scriptsManager, { loadScript, reducer } from 'src';
import _manager from 'src/manager';
import * as actions from 'src/actions';
import _reducer from 'src/reducer';

describe('Redux Scripts Manager (entry point)', () => {
  it('should set the manager as the default export', () => {
    expect(scriptsManager).to.equal(_manager);
  });

  it('should export the `loadScript` action', () => {
    expect(loadScript).to.equal(actions.loadScript);
  });

  it('should export the `reducer`', () => {
    expect(reducer).to.equal(_reducer);
  });
});
