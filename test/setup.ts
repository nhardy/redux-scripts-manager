import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import pq from 'proxyquire';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

export interface IStubs {
  [path: string]: any;
}

export type IProxyquire = <T>(path: string, stubs?: IStubs) => T;

chai.use(chaiAsPromised);
chai.use(sinonChai);

Object.assign(global, {
  expect: chai.expect,
  sinon,
  proxyquire: (path: string, stubs: IStubs = {}) => {
    pq.noCallThru();
    return pq(path, stubs);
  },
});
