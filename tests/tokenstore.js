var assert = require('assert');
var TokenStore = require('../src/tokenstore.js');

describe('TokenStore', function(){
    it('should create a new tokenstore on a non existing location', function(){

        token_store = TokenStore('.none-existing.tokens.json')
        var result = token_store.load()

        assert.deepStrictEqual(result, {});
        assert.deepStrictEqual(token_store.tokens, {});
    });
})
