const assert = require('assert');
const XboxWebClient = require('../src/client')

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

    it('should create an empty xbox-webapi-node client', function(done){

        this.client.isAuthenticated().then(function(){
            assert.deepStrictEqual(true, false)
            done()
        
        }).catch(function(error){
            assert.deepStrictEqual(true, true)
            done()
        })

        // assert.deepStrictEqual(typeof client, 'object')
    })

    afterEach(function() {
        delete this.client
    });

    after(function() {
        this.serverRun.close()
    });
})