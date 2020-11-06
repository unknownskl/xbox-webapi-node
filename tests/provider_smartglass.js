const assert = require('assert');
const XboxWebClient = require('../src/client')
const Provider = require('../src/providers/smartglass')

var http = require('http')

describe('provider/smartglass', function(){
    before(function(){
        var mockserver = require('mockserver')('tests/mock_data', false)
        this.serverRun = http.createServer(mockserver).listen(9001);

        var client = XboxWebClient()
        this.provider = client.getProvider('smartglass')
        this.provider._endpoint = 'http://127.0.0.1:9001'
    })

    // beforeEach(function(){
    // })

    it('should be able to get a list of consoles using getConsolesList()', function(done){
        this.provider.getConsolesList().then(function(result){
            assert.deepStrictEqual(result.status.errorCode, 'OK')
            assert.deepStrictEqual(result.status.errorMessage, null)

            assert.deepStrictEqual(result.result.length, 1)
            assert.deepStrictEqual(result.result[0].id, 'FD00000000000000')
            assert.deepStrictEqual(result.result[0].name, 'XBOXONE')
            assert.deepStrictEqual(result.result[0].consoleType, 'XboxOneS')
            assert.deepStrictEqual(result.result[0].powerState, 'ConnectedStandby')
            assert.deepStrictEqual(result.result[0].digitalAssistantRemoteControlEnabled, true)
            assert.deepStrictEqual(result.result[0].remoteManagementEnabled, true)
            assert.deepStrictEqual(result.result[0].consoleStreamingEnabled, true)

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    it('should be able to get a list of apps/games using getInstalledApps()', function(done){
        this.provider.getInstalledApps().then(function(result){
            // console.log(result)

            assert.deepStrictEqual(result.status.errorCode, 'OK')
            assert.deepStrictEqual(result.status.errorMessage, null)

            assert.deepStrictEqual(result.result.length, 2)
            assert.deepStrictEqual(result.result[0].oneStoreProductId, '9WZDNCRFJ3TJ')
            assert.deepStrictEqual(result.result[0].titleId, 327370029)
            assert.deepStrictEqual(result.result[0].aumid, '4DF9E0F8.Netflix_mcm4njqhnhss8!App')
            assert.deepStrictEqual(result.result[0].lastActiveTime, '2020-10-31T01:19:30.156Z')
            assert.deepStrictEqual(result.result[0].isGame, false)
            assert.deepStrictEqual(result.result[0].name, 'Netflix')
            assert.deepStrictEqual(result.result[0].contentType, 'App')
            assert.deepStrictEqual(result.result[0].instanceId, '{A89ECE52-7E8E-444F-BBD0-C68B76C2ECA4}#4DF9E0F8.Netflix_mcm4njqhnhss8')
            assert.deepStrictEqual(result.result[0].storageDeviceId, 'A89ECE52-7E8E-444F-BBD0-C68B76C2ECA4')
            assert.deepStrictEqual(result.result[0].uniqueId, '4DF9E0F8.Netflix_mcm4njqhnhss8')
            assert.deepStrictEqual(result.result[0].legacyProductId, null)
            assert.deepStrictEqual(result.result[0].version, 2251954432507974)
            assert.deepStrictEqual(result.result[0].sizeInBytes, 7250253)
            assert.deepStrictEqual(result.result[0].installTime, '2018-04-07T04:05:04.438Z')
            assert.deepStrictEqual(result.result[0].updateTime, '2020-03-19T11:03:50.501Z')
            assert.deepStrictEqual(result.result[0].parentId, null)

            assert.deepStrictEqual(result.result.length, 2)
            assert.deepStrictEqual(result.result[1].oneStoreProductId, 'BPQ955FQFPH6')
            assert.deepStrictEqual(result.result[1].titleId, 144389848)
            assert.deepStrictEqual(result.result[1].aumid, 'Destiny2_z7wx9v9k22rmg!tiger.ReleaseFinal')
            assert.deepStrictEqual(result.result[1].lastActiveTime, '2020-08-28T14:10:28.213Z')
            assert.deepStrictEqual(result.result[1].isGame, true)
            assert.deepStrictEqual(result.result[1].name, 'Destiny 2')
            assert.deepStrictEqual(result.result[1].contentType, 'Game')
            assert.deepStrictEqual(result.result[1].instanceId, '{A89ECE52-7E8E-444F-BBD0-C68B76C2ECA4}#0C57204F-F4F0-4BF6-B119-B7AFC231994D')
            assert.deepStrictEqual(result.result[1].storageDeviceId, 'A89ECE52-7E8E-444F-BBD0-C68B76C2ECA4')
            assert.deepStrictEqual(result.result[1].uniqueId, '0C57204F-F4F0-4BF6-B119-B7AFC231994D')
            assert.deepStrictEqual(result.result[1].legacyProductId, 'B5E968ED-9E38-45E1-878E-84981802E90C')
            assert.deepStrictEqual(result.result[1].version, 5716180992)
            assert.deepStrictEqual(result.result[1].sizeInBytes, 116757692416)
            assert.deepStrictEqual(result.result[1].installTime, '2020-06-12T20:51:38.532Z')
            assert.deepStrictEqual(result.result[1].updateTime, '2020-09-22T17:44:05.364Z')
            assert.deepStrictEqual(result.result[1].parentId, null)

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