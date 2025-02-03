import assert from 'assert'
import XboxWebApi from '../src/lib'

describe('XboxWebApi', function () {
    describe('#constructor()', function () {
      it('should be able to construct without error', function (done) {
        const client = new XboxWebApi({
            uhs: 'uhs',
            token: '',
        })

        assert.equal(client.constructor.name, 'XboxWebApi')

        done();
      });
    });
});