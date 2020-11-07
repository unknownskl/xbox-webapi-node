const assert = require('assert');
const XboxWebClient = require('../src/client')

var http = require('http')

describe('provider/people', function(){
    before(function(){
        var mockserver = require('mockserver')('tests/mock_data', false)
        this.serverRun = http.createServer(mockserver).listen(9001);

        var client = XboxWebClient()
        this.provider = client.getProvider('people')
        this.provider._endpoint = 'http://127.0.0.1:9001'
    })

    // beforeEach(function(){
    // })

    it('should be able to get list of friends using getFriends()', function(done){
        this.provider.getFriends().then(function(result){
            assert.deepStrictEqual(result.people.length, 2)

            assert.deepStrictEqual(result.people[0].xuid, '0000000000000000')
            assert.deepStrictEqual(result.people[0].displayName, 'displayname_data')
            assert.deepStrictEqual(result.people[0].gamertag, 'gamertag_data')
            assert.deepStrictEqual(result.people[0].gamerScore, '10')
            assert.deepStrictEqual(result.people[1].xuid, '0000000000000001')
            assert.deepStrictEqual(result.people[1].displayName, 'displayname_data')
            assert.deepStrictEqual(result.people[1].gamertag, 'gamertag_data')
            assert.deepStrictEqual(result.people[1].gamerScore, '30360')

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