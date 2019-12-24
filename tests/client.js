var assert = require('assert');
var XboxApiClient = require('../src/client.js')
var TokenStore = require('../src/tokenstore.js')

describe('client', function(){
    it('Should init a new client', function(){
        var client = XboxApiClient()
    });

    it('Should init a new client with TokenStore enabled', function(){
        var token_store = TokenStore()

        var client = XboxApiClient(token_store)

        client.authenticate().then(function(client){
            console.log('client', client)

        }).catch(function(error){
            console.log('error', error)
        })
    });
})
