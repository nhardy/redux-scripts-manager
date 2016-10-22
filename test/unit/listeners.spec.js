describe('Listeners', () => {
  let register;
  let notify;
  const src = 'https://example.org/script.js';

  beforeEach(() => {
    const listeners = proxyquire('src/listeners');
    register = listeners.register;
    notify = listeners.notify;
  });

  it('should not fire listeners if no scripts have been loaded', () => {
    const listener = sinon.stub();
    register(src, listener);
    expect(listener).to.not.have.been.called;
  });

  it('should not fire listeners if when a script loads', () => {
    const listener = sinon.stub();
    register(src, listener);
    notify(src);
    expect(listener).to.have.been.called;
  });

  it('should fire additional listeners added after script loads', () => {
    const listener1 = sinon.stub();
    const listener2 = sinon.stub();
    register(src, listener1);
    notify(src);
    register(src, listener2);
    expect(listener2).to.have.been.called;
  });

  it('should not fire earlier listeners when registering new ones', () => {
    const listener1 = sinon.stub();
    const listener2 = sinon.stub();
    register(src, listener1);
    notify(src);
    listener1.reset();
    register(src, listener2);
    expect(listener1).to.not.have.been.called;
  });

});
