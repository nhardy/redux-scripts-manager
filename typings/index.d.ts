import { SinonApi } from 'sinon';
import { IProxyquire } from 'test/setup';

declare global {
  const expect: Chai.ExpectStatic;
  const sinon: SinonApi;
  const proxyquire: IProxyquire;
}
