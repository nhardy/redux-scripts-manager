import * as _listeners from 'src/listeners';

describe('Listeners', () => {
  let sandbox: sinon.SinonSandbox;
  let register: typeof _listeners.register;
  let notify: typeof _listeners.notify;
  const src = 'https://example.org/script.js';

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    ({ register, notify } = proxyquire('src/listeners'));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should not fire listeners if no scripts have been loaded', () => {
    const listener = sandbox.stub();
    register(src, listener);
    expect(listener).to.have.callCount(0);
  });

  it('should not fire listeners if when a script loads', () => {
    const listener = sandbox.stub();
    register(src, listener);
    notify(src);
    expect(listener).to.have.callCount(1);
  });

  it('should fire additional listeners added after script loads', () => {
    const listener1 = sandbox.stub();
    const listener2 = sandbox.stub();
    register(src, listener1);
    notify(src);
    register(src, listener2);
    expect(listener2).to.have.callCount(1);
  });

  it('should not fire earlier listeners when registering new ones', () => {
    const listener1 = sandbox.stub();
    const listener2 = sandbox.stub();
    register(src, listener1);
    notify(src);
    listener1.reset();
    register(src, listener2);
    expect(listener1).to.have.callCount(0);
  });
});
