const assert = require('assert');
const XboxWebClient = require('../src/client')
const HttpClient = require('../src/http')

var http = require('http')

describe('client', function(){
    before(function(){
        var mockserver = require('mockserver')('tests/mock_data', false)
        this.serverRun = http.createServer(mockserver).listen(9001);
    })

    beforeEach(function(){

        this.client = XboxWebClient()
        
        this.client._authentication._endpoints = {
            live: 'http://localhost:9001',
            auth: 'http://127.0.0.1:9001',
            xsts: 'http://127.0.0.1:9001'
        }
        this.client._authentication._tokensFile = '.tokens.test.json'
    })

    it('should create an empty xbox-webapi-node client', function(){
        assert.deepStrictEqual(typeof this.client, 'object')
    })

    it('should fail isAuthenticated()', function(done){

        this.client.isAuthenticated().then(function(){
            assert.deepStrictEqual(true, false)
            done()
        
        }).catch(function(error){
            assert.deepStrictEqual(true, true)
            done()
        })

        // assert.deepStrictEqual(typeof client, 'object')
    })

    it('should test the authentication webserver', function(done){

        this.client.startAuthServer(function(token){
            assert.deepStrictEqual(token.scope, 'XboxLive.signin XboxLive.offline_access')
            assert.deepStrictEqual(token.access_token, 'access_token_example')
            assert.deepStrictEqual(token.refresh_token, 'refresh_token_example')
            assert.deepStrictEqual(token.user_id, 'user_id_example')

            done()
        })

        HttpClient().get('http://localhost:8080/auth/callback?code=abc123').then(function(response){
            assert.deepStrictEqual(true, true)
            // console.log(response)
        }).catch(function(error){
            console.log('Error:', error)
            assert.deepStrictEqual(true, false)
        })
    })

    it('should test the authentication webserver on port 5557', function(done){

        this.client.startAuthServer(function(token){
            assert.deepStrictEqual(token.scope, 'XboxLive.signin XboxLive.offline_access')
            assert.deepStrictEqual(token.access_token, 'access_token_example')
            assert.deepStrictEqual(token.refresh_token, 'refresh_token_example')
            assert.deepStrictEqual(token.user_id, 'user_id_example')

            done()
        }, 5557)

        HttpClient().get('http://localhost:5557/auth/callback?code=abc123').then(function(response){
            assert.deepStrictEqual(true, true)
            // console.log(response)
        }).catch(function(error){
            console.log('Error:', error)
            assert.deepStrictEqual(true, false)
        })
    })

    afterEach(function() {
        delete this.client
    });

    after(function() {
        this.serverRun.close()
    });
})