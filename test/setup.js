import path from 'path';

import { addPath } from 'app-module-path';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';


addPath(path.resolve(__dirname, '..'));

global.expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(sinonChai);

global.proxyquire = (stub, stubs = {}) => {
  proxyquire.noCallThru();
  return proxyquire(stub, stubs);
};

global.sinon = sinon;
