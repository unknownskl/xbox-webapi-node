const assert = require('assert');
const XboxWebClient = require('../src/client')

var http = require('http')

describe('provider/catalog', function(){
    before(function(){
        var mockserver = require('mockserver')('tests/mock_data', false)
        this.serverRun = http.createServer(mockserver).listen(9001);

        var client = XboxWebClient()
        this.provider = client.getProvider('catalog')
        this.provider._endpoint = 'http://127.0.0.1:9001'
    })

    // beforeEach(function(){
    // })

    it('should be able to search for a title using searchTitle(titleId)', function(done){
        this.provider.searchTitle('Destiny 2').then(function(result){
            // console.log(result)

            assert.deepStrictEqual(result.TotalResultCount, 10)
            assert.deepStrictEqual(result.Results.length, result.TotalResultCount)

            assert.deepStrictEqual(result.Results[0].ProductFamilyName, 'Games')
            assert.deepStrictEqual(result.Results[0].Products[0].Title, 'Destiny 2')
            assert.deepStrictEqual(result.Results[0].Products[0].Type, 'Game')
            assert.deepStrictEqual(result.Results[0].Products[0].ProductId, 'BPQ955FQFPH6')
            assert.deepStrictEqual(result.Results[0].Products[0].Title, 'Destiny 2')

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    it('should be able to get store data with a title using getProductFromAlternateId(titleId)', function(done){
        this.provider.getProductFromAlternateId('371594669','XboxTitleId').then(function(result){
            // console.log(result)

            assert.deepStrictEqual(result.BigIds[0], '9VWGNH0VBZJX')
            assert.deepStrictEqual(result.HasMorePages, false)
            assert.deepStrictEqual(result.Products.length, 1)
            
            // console.log(result.Products[0].LocalizedProperties[0])

            assert.deepStrictEqual(result.Products[0].ProductFamily, 'Apps')
            assert.deepStrictEqual(result.Products[0].SandboxId, 'RETAIL')
            assert.deepStrictEqual(result.Products[0].ProductId, '9VWGNH0VBZJX')
            assert.deepStrictEqual(result.Products[0].ProductType, 'Application')

            assert.deepStrictEqual(result.Products[0].LocalizedProperties[0].ProductTitle, 'Tv')
            assert.deepStrictEqual(result.Products[0].LocalizedProperties[0].Language, 'nl-NL')
            assert.deepStrictEqual(result.Products[0].LocalizedProperties[0].PublisherName, 'Microsoft')

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