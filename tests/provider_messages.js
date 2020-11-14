const assert = require('assert');
const XboxWebClient = require('../src/client')

var http = require('http')

describe('provider/messages', function(){
    before(function(){
        var mockserver = require('mockserver')('tests/mock_data', false)
        this.serverRun = http.createServer(mockserver).listen(9001);

        var client = XboxWebClient()
        this.provider = client.getProvider('messages')
        this.provider._endpoint = 'http://127.0.0.1:9001'
    })

    // beforeEach(function(){
    // })

    it('should be able to get messages using getInbox()', function(done){
        this.provider.getInbox().then(function(result){
            assert.deepStrictEqual(result.primary.totalCount, 1)

            assert.deepStrictEqual(result.primary.conversations[0].participants[0], '0000000000000000')
            assert.deepStrictEqual(result.primary.conversations[0].networkId, 'Xbox')
            assert.deepStrictEqual(result.primary.conversations[0].type, 'OneToOne')
            assert.deepStrictEqual(result.primary.conversations[0].conversationId, '00000000-0000-0000-90cb-3d0100000900')
            assert.deepStrictEqual(result.primary.conversations[0].isRead, true)
            assert.deepStrictEqual(result.primary.conversations[0].muted, false)

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