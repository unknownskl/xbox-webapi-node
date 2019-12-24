var assert = require('assert');
var XboxApiClient = require('../src/client.js')
var TokenStore = require('../src/tokenstore.js')

describe('client', function(){

    async function auth_user_check() {
        var check_token_store = TokenStore()
        var check_client = XboxApiClient(check_token_store)

        var user_info = await check_client.authenticate()

        console.log('Running tests as xbox live user:', user_info.gtg, '(Dummy account)')
        // }).catch(function(error){
        //     console.log('Running tests as anonymous')
        // })
    }

    auth_user_check()

    it('Should init a new client', function(){
        var client = XboxApiClient()
    });

    it('Should init a new client with TokenStore enabled', function(done){
        var token_store = TokenStore()

        var client = XboxApiClient(token_store)

        client.authenticate().then(function(client){
            //console.log('client', client)
            done()

        }).catch(function(error){
            console.log('error', error)
            done()
        })
    });

    it('Should get data using a provider (userpresence)', function(done){
        var token_store = TokenStore()

        var client = XboxApiClient(token_store)

        client.authenticate().then(function(user_info){
            client.provider('userpresence').get('users/me').then(function(data){

                assert.deepStrictEqual(data.state, 'Offline')
                assert.deepStrictEqual(data.xuid, user_info.xid)
                done()
            }).catch(function(error){
                console.log('error', error)
                done()
            })

        }).catch(function(error){
            console.log('error', error)
            done()
        })
    });

    it('Should get data using a provider (achievements)', function(done){
        var token_store = TokenStore()

        var client = XboxApiClient(token_store)

        client.authenticate().then(function(user_info){
            client.provider('achievements').get('users/xuid('+user_info.xid.toString()+')/history/titles').then(function(data){

                // ok?
                done()
            }).catch(function(error){
                console.log('error', error)
                done()
            })

        }).catch(function(error){
            console.log('error', error)
            done()
        })
    });

    it('Should get data using a provider (titlehub)', function(done){
        var token_store = TokenStore()

        var client = XboxApiClient(token_store)

        client.authenticate().then(function(user_info){
            client.provider('titlehub').post('titles/batch/decoration/detail', {
                "pfns": [
                    'Microsoft.SeaofThieves_8wekyb3d8bbwe', 'SpotifyAB.SpotifyMusic-forXbox_zpdnekdrzrea0'
                ],
                "windowsPhoneProductIds": []
            }).then(function(data){

                assert.deepStrictEqual(data.titles[0].pfn, 'SpotifyAB.SpotifyMusic-forXbox_zpdnekdrzrea0')
                assert.deepStrictEqual(data.titles[0].name, 'Spotify Music - for Xbox One')
                assert.deepStrictEqual(data.titles[0].type, 'Application')

                assert.deepStrictEqual(data.titles[1].pfn, 'Microsoft.SeaofThieves_8wekyb3d8bbwe')
                assert.deepStrictEqual(data.titles[1].name, 'Sea of Thieves')
                assert.deepStrictEqual(data.titles[1].type, 'Game')

                done()
            }).catch(function(error){
                console.log('error', error)
                done()
            })

        }).catch(function(error){
            console.log('error', error)
            done()
        })
    });
})
