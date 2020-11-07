const assert = require('assert');
const XboxWebClient = require('../src/client')

var http = require('http')

describe('provider/gameclips', function(){
    before(function(){
        var mockserver = require('mockserver')('tests/mock_data', false)
        this.serverRun = http.createServer(mockserver).listen(9001);

        var client = XboxWebClient()
        this.provider = client.getProvider('gameclips')
        this.provider._endpoint = 'http://127.0.0.1:9001'
    })

    // beforeEach(function(){
    // })

    it('should be able to get recent user gameclips using getUserGameclips()', function(done){
        this.provider.getUserGameclips().then(function(result){
            // console.log(result)

            assert.deepStrictEqual(result.gameClips.length, 1)
            assert.deepStrictEqual(result.gameClips[0].gameClipId, '00000000-0000-0000-0000-000000000000')
            assert.deepStrictEqual(result.gameClips[0].state, 'Published')
            assert.deepStrictEqual(result.gameClips[0].type, 'UserGenerated')
            assert.deepStrictEqual(result.gameClips[0].titleId, 144389848)
            assert.deepStrictEqual(result.gameClips[0].rating, 0)
            assert.deepStrictEqual(result.gameClips[0].ratingCount, 0)
            assert.deepStrictEqual(result.gameClips[0].views, 1)
            assert.deepStrictEqual(result.gameClips[0].xuid, '0000000000000000')
            assert.deepStrictEqual(result.gameClips[0].titleName, 'Destiny 2')
            assert.deepStrictEqual(result.gameClips[0].gameClipLocale, 'en-US')
            assert.deepStrictEqual(result.gameClips[0].deviceType, 'Durango')

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    it('should be able to get community gameclips by title id using getCommunityGameclipsByTitleId(titleId)', function(done){
        this.provider.getCommunityGameclipsByTitleId(144389848).then(function(result){
            // console.log(result)

            assert.deepStrictEqual(result.gameClips.length, 1)
            assert.deepStrictEqual(result.gameClips[0].gameClipId, 'd8575ea3-c1e1-44b7-8e72-7449dd2c26c8')
            assert.deepStrictEqual(result.gameClips[0].state, 'Published')
            assert.deepStrictEqual(result.gameClips[0].type, 'UserGenerated')
            assert.deepStrictEqual(result.gameClips[0].titleId, 144389848)
            assert.deepStrictEqual(result.gameClips[0].rating, 0)
            assert.deepStrictEqual(result.gameClips[0].ratingCount, 0)
            assert.deepStrictEqual(result.gameClips[0].views, 0)
            assert.deepStrictEqual(result.gameClips[0].xuid, '0000000000000000')
            assert.deepStrictEqual(result.gameClips[0].titleName, 'Destiny 2')
            assert.deepStrictEqual(result.gameClips[0].gameClipLocale, 'en-US')
            assert.deepStrictEqual(result.gameClips[0].deviceType, 'Scorpio')

            assert.deepStrictEqual(result.pagingInfo.continuationToken, 'abcde_vwxyzZAAAAA2')

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    it('should be able to get gameclips by xuid using getGameclipsByXuid(xuid)', function(done){
        this.provider.getGameclipsByXuid('0000000000000000').then(function(result){
            // console.log(result)

            assert.deepStrictEqual(result.gameClips.length, 1)
            assert.deepStrictEqual(result.gameClips[0].gameClipId, '441ba629-7d58-46ca-b774-2b6da11afc66')
            assert.deepStrictEqual(result.gameClips[0].state, 'Published')
            assert.deepStrictEqual(result.gameClips[0].type, 'UserGenerated')
            assert.deepStrictEqual(result.gameClips[0].titleId, 144389848)
            assert.deepStrictEqual(result.gameClips[0].rating, 0)
            assert.deepStrictEqual(result.gameClips[0].ratingCount, 0)
            assert.deepStrictEqual(result.gameClips[0].views, 1)
            assert.deepStrictEqual(result.gameClips[0].xuid, '0000000000000000')
            assert.deepStrictEqual(result.gameClips[0].titleName, 'Destiny 2')
            assert.deepStrictEqual(result.gameClips[0].gameClipLocale, 'en-AU')
            assert.deepStrictEqual(result.gameClips[0].deviceType, 'Durango')

            assert.deepStrictEqual(result.pagingInfo.continuationToken, null)

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    it('should be able to get gameclips by xuid and title id using getGameclipsByXuid(xuid, titleId)', function(done){
        this.provider.getGameclipsByXuid('0000000000000000', '144389848').then(function(result){
            // console.log(result)

            assert.deepStrictEqual(result.gameClips.length, 1)
            assert.deepStrictEqual(result.gameClips[0].gameClipId, '441ba629-7d58-46ca-b774-2b6da11afc66')
            assert.deepStrictEqual(result.gameClips[0].state, 'Published')
            assert.deepStrictEqual(result.gameClips[0].type, 'UserGenerated')
            assert.deepStrictEqual(result.gameClips[0].titleId, 144389848)
            assert.deepStrictEqual(result.gameClips[0].rating, 0)
            assert.deepStrictEqual(result.gameClips[0].ratingCount, 0)
            assert.deepStrictEqual(result.gameClips[0].views, 1)
            assert.deepStrictEqual(result.gameClips[0].xuid, '0000000000000000')
            assert.deepStrictEqual(result.gameClips[0].titleName, 'Destiny 2')
            assert.deepStrictEqual(result.gameClips[0].gameClipLocale, 'en-AU')
            assert.deepStrictEqual(result.gameClips[0].deviceType, 'Durango')

            assert.deepStrictEqual(result.pagingInfo.continuationToken, null)

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