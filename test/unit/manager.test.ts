import { Store } from 'redux';
import _manager from 'src/manager';
import { initialState, IScriptsState } from 'src/reducer';

describe('Manager', () => {
  let manager: typeof _manager;
  let sandbox: sinon.SinonSandbox;
  const src = 'https://example.org/script.js';
  const mockAction = {
    type: 'SCRIPT_LOADED',
    src,
  };
  let scriptLoaded: sinon.SinonSpy;
  let notify: sinon.SinonStub;
  let store: Pick<Store, 'dispatch' | 'getState' | 'subscribe'>;
  let getState: sinon.SinonStub;
  let dispatch: sinon.SinonStub;
  let subscribe: sinon.SinonStub;
  let updateStore: (state?: IScriptsState) => void;
  let head: { appendChild: sinon.SinonStub; };

  before(() => {
    sandbox = sinon.createSandbox();
    scriptLoaded = sandbox.spy(() => mockAction);
    notify = sandbox.stub();
    manager = proxyquire<{ default: typeof _manager }>('src/manager', {
      './actions': { scriptLoaded },
      './listeners': { notify },
    }).default;
    getState = sandbox.stub();
    dispatch = sandbox.stub();
    subscribe = sandbox.stub();
    store = { getState, dispatch, subscribe };
    const querySelector = sandbox.stub();
    const createElement = sandbox.stub();
    (global as any).window = {};
    (global as any).document = {
      querySelector,
      createElement,
    };
    const appendChild = sandbox.stub();
    head = { appendChild };
  });

  afterEach(() => {
    sandbox.reset();
  });

  after(() => {
    delete (global as any).window;
    delete (global as any).document;
  });

  [
    { message: '' },
    { message: 'when using a non-default store path', path: 'scriptsLoader' },
  ].forEach(({ message, path }) => {
    context(message, () => {
      beforeEach(() => {
        getState.returns({
          [path || 'scripts']: initialState,
        });
        manager(store as Store, path);
        updateStore = (newState = initialState) => {
          getState.returns({
            [path || 'scripts']: newState,
          });
          subscribe.lastCall.args[0]();
        };

        (document.querySelector as sinon.SinonStub).withArgs('head')
          .returns(head);
        (document.createElement as sinon.SinonStub).withArgs('script')
          .returns({});
      });

      it('should do nothing if there has been no change to the store', () => {
        updateStore();
        expect(document.querySelector).to.have.callCount(0);
      });

      context('without a custom callback', () => {
        it('should insert the script, and run onload when the script loads', () => {
          updateStore({
            loading: [src],
            loaded: [],
            callbacks: {},
          });
          expect(head.appendChild).to.have.callCount(1);
          const script = head.appendChild.lastCall.args[0];
          expect(script).to.include({
            src,
            type: 'text/javascript',
            async: true,
          });
          script.onload();
          expect(dispatch).to.have.been.calledWith(mockAction);
          expect(notify).to.have.been.calledWith(src);
        });
      });

      context('with a custom callback', () => {
        const onloadCallback = '__rsmCallback';
        it('should insert the script, and run onload when the script loads', () => {
          updateStore({
            loading: [src],
            loaded: [],
            callbacks: {
              [src]: onloadCallback,
            },
          });
          expect(head.appendChild).to.have.callCount(1);
          const script = head.appendChild.lastCall.args[0];
          expect(script).to.include({
            src,
            type: 'text/javascript',
            async: true,
          });
          (window as any)[onloadCallback]();
          expect(dispatch).to.have.been.calledWith(mockAction);
          expect(notify).to.have.been.calledWith(src);
        });
      });

      it('should not load the same script twice', () => {
        updateStore({
          loading: [src],
          loaded: [],
          callbacks: {},
        });
        updateStore({
          loading: [src],
          loaded: [],
          callbacks: {},
        });

        expect(head.appendChild).to.have.callCount(1);
      });
    });
  });
});
