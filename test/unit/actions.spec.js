import {
  LOAD_SCRIPT,
  SCRIPT_LOADED,
  CALLBACKS_NAMESPACE,
} from 'src/constants';


describe('Action Creators', () => {
  let sandbox;
  let sha1;
  let register;
  let dispatch;
  let actions;

  before(() => {
    sandbox = sinon.sandbox.create();
    sha1 = sandbox.stub();
    register = sandbox.stub();
    dispatch = sandbox.spy();
    actions = proxyquire('src/actions', {
      sha1,
      './listeners': { register },
    });
  });

  afterEach(() => {
    sandbox.reset();
  });

  describe('loadScript(src)', () => {
    [
      { src: 'https://example.org/script.js', type: 'string' },
      { src: cb => `https://example.org/script.js?onload=${cb}`, type: 'function' },
    ].forEach(({ src, type }) => {
      context(`src is a ${type}`, () => {
        const fakeHash = 'fakeSha1HashString';
        if (type === 'function') {
          before(() => {
            sha1.withArgs(src('')).returns(fakeHash);
          });
        }

        it('should return a thunk', () => {
          expect(actions.loadScript(src)).to.be.a('function');
        });

        it('should dispatch an action with the correct `type` and `src`', () => {
          register.callsArgAsync(1);
          const expectedCallback = `${CALLBACKS_NAMESPACE}fakeSha1Has`;

          actions.loadScript(src)(dispatch);
          expect(dispatch).to.have.been.calledWith({
            type: LOAD_SCRIPT,
            src: type === 'function' ? src(expectedCallback) : src,
            onload: type === 'function' ? expectedCallback : undefined,
          });
        });

        context('when the script has not yet loaded', () => {

          beforeEach(() => {
            register.callsArgAsync(1);
          });

          it('when dispatched, should return a Promise that resolves', () => {
            return expect(actions.loadScript(src)(dispatch)).to.eventually.be.fulfilled;
          });

        });

        context('when the script has already loaded', () => {

          beforeEach(() => {
            register.callsArg(1);
          });

          it('when dispatched, should return a Promise that resolves', () => {
            return expect(actions.loadScript(src)(dispatch)).to.eventually.be.fulfilled;
          });

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
