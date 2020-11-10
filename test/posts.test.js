const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const app = require('../server/app');

chai.use(chaiHttp);

describe('Test api posts ', () => {
  it('POST /posts', (done) => {
    chai
      .request(app)
      .get('/api/v1/posts')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});
