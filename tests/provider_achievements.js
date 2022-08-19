const assert = require('assert');
const XboxWebClient = require('../src/client')

var http = require('http')

describe('provider/achievements', function(){
    before(function(){
        var mockserver = require('mockserver')('tests/mock_data', false)
        this.serverRun = http.createServer(mockserver).listen(9001);

        var client = XboxWebClient()
        this.provider = client.getProvider('achievements')
        this.provider._endpoint = 'http://127.0.0.1:9001'
    })

    // beforeEach(function(){
    // })

    it('should be able to get archievements using getTitleAchievements()', function(done){
        this.provider.getTitleAchievements().then(function(result){
            assert.deepStrictEqual(result.titles.length, 32)

            assert.deepStrictEqual(result.titles[0].titleId, 16308048)
            assert.deepStrictEqual(result.titles[0].serviceConfigId, '111f0100-b519-49cc-b26f-a92d00f8d750')
            assert.deepStrictEqual(result.titles[0].titleType, 'LiveApp')
            assert.deepStrictEqual(result.titles[0].platform, 'Durango')
            assert.deepStrictEqual(result.titles[0].name, 'TrueAchievements')
            assert.deepStrictEqual(result.titles[0].earnedAchievements, 3)
            assert.deepStrictEqual(result.titles[0].currentGamerscore, 0)
            assert.deepStrictEqual(result.titles[0].maxGamerscore, 0)

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    it('should be able to get 360 archievements using getTitleAchievements360()', function(done){
        this.provider.getTitleAchievements360().then(function(result){
            assert.deepStrictEqual(result.titles.length, 32)

            assert.deepStrictEqual(result.titles[0].titleId, 16308048)
            assert.deepStrictEqual(result.titles[0].serviceConfigId, '111f0100-b519-49cc-b26f-a92d00f8d750')
            assert.deepStrictEqual(result.titles[0].titleType, 'LiveApp')
            assert.deepStrictEqual(result.titles[0].platform, 'Durango')
            assert.deepStrictEqual(result.titles[0].name, 'TrueAchievements')
            assert.deepStrictEqual(result.titles[0].earnedAchievements, 3)
            assert.deepStrictEqual(result.titles[0].currentGamerscore, 0)
            assert.deepStrictEqual(result.titles[0].maxGamerscore, 0)

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    it('should be able to get achievements by titleid using getTitleId(titleid)', function(done){
        this.provider.getTitleId(16308048).then(function(result){
            assert.deepStrictEqual(result.achievements.length, 20)

            assert.deepStrictEqual(result.achievements[0].id, '1')
            assert.deepStrictEqual(result.achievements[0].serviceConfigId, '111f0100-b519-49cc-b26f-a92d00f8d750')
            assert.deepStrictEqual(result.achievements[0].name, 'The First Rule of TrueAchievements...')
            assert.deepStrictEqual(result.achievements[0].progressState, 'Achieved')
            assert.deepStrictEqual(result.achievements[0].isSecret, false)
            assert.deepStrictEqual(result.achievements[0].productId, 'e36c9310-c795-4d9e-9cfd-6a9fc4488b52')
            assert.deepStrictEqual(result.achievements[0].platforms[0], 'Durango')
            assert.deepStrictEqual(result.achievements[0].progression.timeUnlocked, '2016-06-24T18:53:59.0348490Z')
            assert.deepStrictEqual(result.achievements[0].mediaAssets[0].name, '19764f59-085e-4577-826c-cc73eb3d2d4f.png')
            assert.deepStrictEqual(result.achievements[0].mediaAssets[0].type, 'Icon')
            assert.deepStrictEqual(result.achievements[0].mediaAssets[0].url, 'http://images-eds.xboxlive.com/image?url=z951ykn43p4FqWbbFvR2Ec.8vbDhj8G2Xe7JngaTToDRxPSZkcllPiupTw7Zp3wiTZ3YTPIAHEVR9JAueHk_pC7vowTnc7..jAVKnB0RcyO6kZICH8f_ko_mJSdWQB7xdGZqq0usmCjN7Gdxm64ExazBJDxTJyIVFih5nd5FMmKjwVuR4t4SNk2ggJDZt0Os')

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    it('should be able to get 360 achievements by titleid using getTitleId360(titleid)', function(done){
        this.provider.getTitleId360(1297287135).then(function(result){
            assert.deepStrictEqual(result.achievements.length, 4)

            assert.deepStrictEqual(result.achievements[0].id, 14)
            assert.deepStrictEqual(result.achievements[0].titleId, 1297287135)
            assert.deepStrictEqual(result.achievements[0].name, 'Rescued Kluke')
            assert.deepStrictEqual(result.achievements[0].sequence, 2)
            assert.deepStrictEqual(result.achievements[0].flags, 1245188)
            assert.deepStrictEqual(result.achievements[0].unlockedOnline, true)
            assert.deepStrictEqual(result.achievements[0].unlocked, true)
            assert.deepStrictEqual(result.achievements[0].isSecret, true)
            assert.deepStrictEqual(result.achievements[0].platform, 1)
            assert.deepStrictEqual(result.achievements[0].gamerscore, 5)
            assert.deepStrictEqual(result.achievements[0].description, 'You rescued Kluke without falling.')
            assert.deepStrictEqual(result.achievements[0].timeUnlocked, '2009-01-03T00:56:07.6670000Z')

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