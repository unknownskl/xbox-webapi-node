const assert = require('assert');
const XboxWebClient = require('../src/client')

var http = require('http')

describe('provider/pins', function(){
    before(function(){
        var mockserver = require('mockserver')('tests/mock_data', false)
        this.serverRun = http.createServer(mockserver).listen(9001);

        var client = XboxWebClient()
        this.provider = client.getProvider('pins')
        this.provider._endpoint = 'http://127.0.0.1:9001'
    })

    // beforeEach(function(){
    // })

    it('should be able to get your pinned items using getPins()', function(done){
        this.provider.getPins().then(function(result){
            assert.deepStrictEqual(result.ImpressionId, 'Lists.00000000-0000-0000-0000-000000000000')
            assert.deepStrictEqual(result.ListItems.length, 3)

            assert.deepStrictEqual(result.ListItems[0].Index, 0)
            assert.deepStrictEqual(result.ListItems[0].Item.Title, 'Destiny 2')
            assert.deepStrictEqual(result.ListItems[0].Item.ItemId, 'b5e968ed-9e38-45e1-878e-84981802e90c')
            assert.deepStrictEqual(result.ListItems[0].Item.ContentType, 'DGame')

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