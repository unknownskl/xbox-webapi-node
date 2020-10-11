const assert = require('assert');
const XboxWebClient = require('../src/client')

describe('client', function(){
    it('should create an empty xbox-webapi-node client', function(){
        var client = XboxWebClient()

        assert.deepStrictEqual(typeof client, 'object')
    })
})