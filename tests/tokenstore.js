var assert = require('assert');
var TokenStore = require('../src/tokenstore.js');

describe('TokenStore', function(){
    it('should create a new tokenstore on a non existing location', function(){

        var token_store = TokenStore('.none-existing.tokens.json')
        var result = token_store.load()
    });

    it('should load tokenstore on existing location', function(){
        var token_store = TokenStore()
        var result = token_store.load()
    });

    it('should write tokenstore on existing location', function(){
        var token_store = TokenStore()
        token_store.load()
        var result = token_store.save()

        assert.deepStrictEqual(result, true);
    });

    it('should not write tokenstore on a location it does not have permissions to', function(){
        var token_store = TokenStore('/.tokens.tamp.json')
        token_store.load()
        var result = token_store.save()

        assert.notDeepEqual(result, true);
    });

    it('should set a token in the TokenStore', function(){
        var token_store = TokenStore()
        token_store.set('test_token', 'random123')

        assert.deepStrictEqual(token_store.tokens.test_token, 'random123');
        assert.deepStrictEqual(token_store.get('test_token'), 'random123');
    });

    it('should set a token in the TokenStore and save and load it again and remove it', function(){
        var token_store = TokenStore()
        token_store.load()
        token_store.set('test_token', 'random123')

        assert.deepStrictEqual(token_store.tokens.test_token, 'random123');
        assert.deepStrictEqual(token_store.get('test_token'), 'random123');

        var result = token_store.save()
        assert.deepStrictEqual(result, true);

        var token_store_alt = TokenStore()
        token_store_alt.load()

        assert.deepStrictEqual(token_store_alt.tokens.test_token, 'random123');
        assert.deepStrictEqual(token_store_alt.get('test_token'), 'random123');

        token_store_alt.delete('test_token')

        assert.deepStrictEqual(token_store_alt.tokens.test_token, undefined);
        assert.deepStrictEqual(token_store_alt.get('test_token'), undefined);

        var result_alt = token_store_alt.save()
        assert.deepStrictEqual(result_alt, true);
    });
})
