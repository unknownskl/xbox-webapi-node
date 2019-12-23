var assert = require('assert');
var authentication = require('../src/authentication.js');

describe('authentication', function(){
    it('should fail with invalid credentials', function(){

        auth_manager = authentication()
        auth_manager.setUserAuth('invalid@mail.com', 'abc123')

        // @TODO:  Implement rejected login
        assert.deepStrictEqual(auth_manager.authenticated, false);
    });
})
