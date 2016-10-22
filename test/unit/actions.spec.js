import {
  LOAD_SCRIPT,
  SCRIPT_LOADED,
} from 'src/constants';


describe('Action Creators', () => {
  let sandbox;
  let register;
  let dispatch;
  let actions;
  const src = 'https://example.org/script.js';

  before(() => {
    sandbox = sinon.sandbox.create();
    register = sandbox.stub();
    dispatch = sandbox.spy();
    actions = proxyquire('src/actions', {
      './listeners': { register },
    });
  });

  afterEach(() => {
    sandbox.reset();
  });

  describe('loadScript(src)', () => {

    it('should return a thunk', () => {
      expect(actions.loadScript(src)).to.be.a('function');
    });

    it('should dispatch an action with the correct `type` and `src`', () => {
      register.callsArgAsync(1);

      actions.loadScript(src)(dispatch);
      expect(dispatch).to.have.been.calledWith({
        type: LOAD_SCRIPT,
        src,
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

  describe('scriptLoaded(src)', () => {

    it('should return an action with the correct `type` and `src`', () => {
      expect(actions.scriptLoaded(src)).to.deep.equal({
        type: SCRIPT_LOADED,
        src,
      });
    });

  });

});
