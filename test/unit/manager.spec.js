import { initialState } from 'src/reducer';


describe('Manager', () => {
  let manager;
  let sandbox;
  const src = 'https://example.org/script.js';
  const mockAction = {
    type: 'SCRIPT_LOADED',
    src,
  };
  let scriptLoaded;
  let notify;
  let store;
  let getState;
  let dispatch;
  let subscribe;
  let updateStore;
  let head;

  before(() => {
    sandbox = sinon.sandbox.create();
    scriptLoaded = sandbox.spy(() => mockAction);
    notify = sandbox.spy();
    manager = proxyquire('src/manager', {
      './actions': { scriptLoaded },
      './listeners': { notify },
    }).default;
    getState = sandbox.stub();
    dispatch = sandbox.spy();
    subscribe = sandbox.spy();
    store = { getState, dispatch, subscribe };
    const querySelector = sandbox.stub();
    const createElement = sandbox.stub();
    global.document = {
      querySelector,
      createElement,
    };
    const appendChild = sandbox.spy();
    head = { appendChild };
  });

  afterEach(() => {
    sandbox.reset();
  });

  after(() => {
    delete global.document;
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
        manager(store, path);
        updateStore = (newState = initialState) => {
          getState.returns({
            [path || 'scripts']: newState,
          });
          subscribe.lastCall.args[0]();
        };

        document.querySelector.withArgs('head').returns(head);
        document.createElement.withArgs('script').returns({});
      });

      it('should do nothing if there has been no change to the store', () => {
        updateStore();
        expect(document.querySelector).to.not.have.been.called;
      });

      it('should insert the script, and run onload when the script loads', () => {
        updateStore({
          loading: [src],
          loaded: [],
        });
        expect(head.appendChild).to.have.been.called;
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

      it('should not load the same script twice', () => {
        updateStore({
          loading: [src],
          loaded: [],
        });
        updateStore({
          loading: [src],
          loaded: [],
        });

        expect(head.appendChild).to.have.been.calledOnce;
      });

    });
  });

});
