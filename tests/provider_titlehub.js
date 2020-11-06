const assert = require('assert');
const XboxWebClient = require('../src/client')

var http = require('http')

describe('provider/titlehub', function(){
    before(function(){
        var mockserver = require('mockserver')('tests/mock_data', false)
        this.serverRun = http.createServer(mockserver).listen(9001);

        var client = XboxWebClient()
        this.provider = client.getProvider('titlehub')
        this.provider._endpoint = 'http://127.0.0.1:9001'
    })

    // beforeEach(function(){
    // })

    it('should be able to get a history of last used apps using getTitleHistory()', function(done){
        this.provider.getTitleHistory().then(function(result){

            assert.deepStrictEqual(result.xuid, '0000000000000000')
            assert.deepStrictEqual(result.titles.length, 2)

            assert.deepStrictEqual(result.titles[0].name, 'Destiny 2')
            assert.deepStrictEqual(result.titles[0].type, 'Game')
            assert.deepStrictEqual(result.titles[0].pfn, 'Bungie.Destiny2basegame_8xb1a0vv8ay84')
            assert.deepStrictEqual(result.titles[1].name, 'Grounded - Game Preview')
            assert.deepStrictEqual(result.titles[1].type, 'Game')
            assert.deepStrictEqual(result.titles[1].pfn, 'Microsoft.Maine_8wekyb3d8bbwe')

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    it('should be able to get details of a title id using getTitleId(titleId)', function(done){
        this.provider.getTitleId('144389848').then(function(result){

            assert.deepStrictEqual(result.xuid, '0000000000000000')
            assert.deepStrictEqual(result.titles.length, 1)

            assert.deepStrictEqual(result.titles[0].name, 'Destiny 2')
            assert.deepStrictEqual(result.titles[0].type, 'Game')
            assert.deepStrictEqual(result.titles[0].pfn, 'Bungie.Destiny2basegame_8xb1a0vv8ay84')

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