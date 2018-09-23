import {
  LOAD_SCRIPT,
  SCRIPT_LOADED,
  CALLBACKS_NAMESPACE,
} from 'src/constants';
import * as _actions from 'src/actions';

describe('Action Creators', () => {
  let sandbox: sinon.SinonSandbox;
  let sha256: sinon.SinonStub;
  let register: sinon.SinonStub;
  let dispatch: sinon.SinonSpy;
  let getState: sinon.SinonStub;
  let actions: typeof _actions;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sha256 = sandbox.stub();
    register = sandbox.stub();
    dispatch = sandbox.spy();
    getState = sandbox.stub();
    actions = proxyquire('src/actions', {
      sha256,
      './listeners': { register },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('loadScript(src, ?callbackName)', () => {
    [
      { src: 'https://example.org/script.js' },
      { src: (cb: string) => `https://example.org/script.js?onload=${cb}` },
      { src: 'https://example.org/script.js', callbackName: 'onApiLoaded' },
    ].forEach(({ src, callbackName }) => {
      context(`src is a ${typeof src}${callbackName ? ' with a callbackName' : ''}`, () => {
        const fakeHash = 'fakesha256HashString';
        if (typeof src === 'function') {
          beforeEach(() => {
            sha256.withArgs(src(''))
              .returns(fakeHash);
          });
        }

        it('should return a thunk', () => {
          expect(actions.loadScript(src)).to.be.a('function');
        });

        it('should dispatch an action with the correct `type`, `src` and `callbackName`', () => {
          register.callsArgAsync(1);
          const expectedCallback = callbackName || `${CALLBACKS_NAMESPACE}fakesha25`;

          actions.loadScript(src)(dispatch, getState, undefined);
          expect(dispatch).to.have.been.calledWith({
            type: LOAD_SCRIPT,
            src: typeof src === 'function' ? src(expectedCallback) : src,
            callbackName: typeof src === 'function' ? expectedCallback : null,
          });
        });

        context('when the script has not yet loaded', () => {
          beforeEach(() => {
            register.callsArgAsync(1);
          });

          it('when dispatched, should return a Promise that resolves', () => (
            expect(actions.loadScript(src)(dispatch, getState, undefined)).to.eventually.be.fulfilled
          ));
        });

        context('when the script has already loaded', () => {
          beforeEach(() => {
            register.callsArg(1);
          });

          it('when dispatched, should return a Promise that resolves', () => (
            expect(actions.loadScript(src)(dispatch, getState, undefined)).to.eventually.be.fulfilled
          ));
        });
      });
    });
  });

  describe('scriptLoaded(src)', () => {
    const src = 'https://example.org/script.js';

    it('should return an action with the correct `type` and `src`', () => {
      expect(actions.scriptLoaded(src)).to.deep.equal({
        type: SCRIPT_LOADED,
        src,
      });
    });
  });
});
