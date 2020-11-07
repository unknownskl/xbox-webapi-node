const assert = require('assert');
const XboxWebClient = require('../src/client')

var http = require('http')

describe('provider/screenshots', function(){
    before(function(){
        var mockserver = require('mockserver')('tests/mock_data', false)
        this.serverRun = http.createServer(mockserver).listen(9001);

        var client = XboxWebClient()
        this.provider = client.getProvider('screenshots')
        this.provider._endpoint = 'http://127.0.0.1:9001'
    })

    // beforeEach(function(){
    // })

    it('should be able to get recent user screenshots using getUserScreenshots()', function(done){
        this.provider.getUserScreenshots().then(function(result){
            // console.log(result)

            assert.deepStrictEqual(result.screenshots.length, 1)
            assert.deepStrictEqual(result.screenshots[0].screenshotId, '00000000-0000-0000-0000-000000000000')
            assert.deepStrictEqual(result.screenshots[0].state, 'Published')
            assert.deepStrictEqual(result.screenshots[0].type, 'UserGenerated')
            assert.deepStrictEqual(result.screenshots[0].titleId, 144389848)
            assert.deepStrictEqual(result.screenshots[0].rating, 0)
            assert.deepStrictEqual(result.screenshots[0].ratingCount, 0)
            assert.deepStrictEqual(result.screenshots[0].views, 0)
            assert.deepStrictEqual(result.screenshots[0].xuid, '0000000000000000')
            assert.deepStrictEqual(result.screenshots[0].titleName, 'Destiny 2')
            assert.deepStrictEqual(result.screenshots[0].screenshotLocale, 'nl-NL')
            assert.deepStrictEqual(result.screenshots[0].deviceType, 'Durango')

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