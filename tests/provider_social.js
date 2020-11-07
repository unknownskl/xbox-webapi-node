const assert = require('assert');
const XboxWebClient = require('../src/client')

var http = require('http')

describe('provider/social', function(){
    before(function(){
        var mockserver = require('mockserver')('tests/mock_data', false)
        this.serverRun = http.createServer(mockserver).listen(9001);

        var client = XboxWebClient()
        this.provider = client.getProvider('social')
        this.provider._endpoint = 'http://127.0.0.1:9001'
    })

    // beforeEach(function(){
    // })

    it('should be able to get a summary of your friends using getFriends()', function(done){
        this.provider.getFriends().then(function(result){
            assert.deepStrictEqual(result.targetFollowingCount, 70)
            assert.deepStrictEqual(result.targetFollowerCount, 60)
            assert.deepStrictEqual(result.isCallerFollowingTarget, false)
            assert.deepStrictEqual(result.isTargetFollowingCaller, false)
            assert.deepStrictEqual(result.hasCallerMarkedTargetAsFavorite, false)
            assert.deepStrictEqual(result.legacyFriendStatus, 'None')
            assert.deepStrictEqual(result.availablePeopleSlots, 941)
            assert.deepStrictEqual(result.recentChangeCount, 0)
            assert.deepStrictEqual(result.watermark, '0000000000000000000')

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