const assert = require('assert');
const XboxWebClient = require('../src/client')

var http = require('http')

describe('provider/profile', function(){
    before(function(){
        var mockserver = require('mockserver')('tests/mock_data', false)
        this.serverRun = http.createServer(mockserver).listen(9001);

        var client = XboxWebClient()
        this.provider = client.getProvider('profile')
        this.provider._endpoint = 'http://127.0.0.1:9001'
    })

    // beforeEach(function(){
    // })

    it('should be able to get your profile using getUserProfile()', function(done){
        this.provider.getUserProfile().then(function(result){
            assert.deepStrictEqual(result.profileUsers.length, 1)

            assert.deepStrictEqual(result.profileUsers[0].id, '0000000000000000')
            assert.deepStrictEqual(result.profileUsers[0].settings.length, 4)

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    // afterEach(function() {
        
    // });

    after(function() {
        delete this.provider
        this.serverRun.close()
    });
})