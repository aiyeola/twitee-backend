import chai from 'chai';
import chaiHttp from 'chai-http';
import { equal } from 'assert';

// import Application from '../index.js';

const { expect } = chai;

chai.use(chaiHttp);

// const application = new Application();
// await application.init();

describe('Api dummy test', function () {
  it('should add numbers correctly', function () {
    equal(5, 5);
  });
});
