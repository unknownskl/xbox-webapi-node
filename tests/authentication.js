const assert = require('assert');
const Authentication = require('../src/authentication')
const HttpClient = require('../src/http')

var http = require('http')

describe('authentication', function(){
    before(function(){
        var mockserver = require('mockserver')('tests/mock_data', false)
        this.serverRun = http.createServer(mockserver).listen(9001);
    })

    beforeEach(function(){
        this.auth = Authentication('5e5ead27-ed60-482d-b3fc-702b28a97404')
        this.auth._endpoints = {
            live: 'http://localhost:9001',
            auth: 'http://127.0.0.1:9001',
            xsts: 'http://127.0.0.1:9001'
        }
        this.auth._tokensFile = '.tokens.test.json'
    })

    it('should generate an authorization url', function(){
        var url = this.auth.generateAuthorizationUrl('http://localhost:8080/auth/callback')

        assert.deepStrictEqual(this.auth._clientId, '5e5ead27-ed60-482d-b3fc-702b28a97404')
        assert.deepStrictEqual(url, 'https://login.live.com/oauth20_authorize.srf?client_id=5e5ead27-ed60-482d-b3fc-702b28a97404&response_type=code&approval_prompt=auto&scope=XboxLive.signin%20XboxLive.offline_access&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcallback')
    })

    it('should test the authentication webserver', function(done){
        var url = this.auth.generateAuthorizationUrl('http://localhost:8080/auth/callback')

        this.auth.startServer(function(token){
            assert.deepStrictEqual(token.scope, 'XboxLive.signin XboxLive.offline_access')
            assert.deepStrictEqual(token.access_token, 'access_token_example')
            assert.deepStrictEqual(token.refresh_token, 'refresh_token_example')
            assert.deepStrictEqual(token.user_id, 'user_id_example')

            done()
        })

        HttpClient().get('http://localhost:8080/auth/callback?code=abc123').then(function(response){
            assert.deepStrictEqual(true, true)
            // console.log(response)
        }).catch(function(error){
            console.log('Error:', error)
            assert.deepStrictEqual(true, false)
        })
    })

    it('should get a oauth token when invoking getTokenRequest()', function(done){
        this.auth.getTokenRequest('abc123').then(function(tokens){
            assert.deepStrictEqual(tokens.token_type, 'bearer')
            assert.deepStrictEqual(tokens.expires_in, 3600)
            assert.deepStrictEqual(tokens.scope, 'XboxLive.signin XboxLive.offline_access')
            assert.deepStrictEqual(tokens.access_token, 'access_token_example')
            assert.deepStrictEqual(tokens.refresh_token, 'refresh_token_example')
            assert.deepStrictEqual(tokens.user_id, 'user_id_example')
            
            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    it('should get a new oauth token when invoking refreshTokens()', function(done){
        this.auth.refreshToken('abc123').then(function(tokens){
            assert.deepStrictEqual(tokens.token_type, 'bearer')
            assert.deepStrictEqual(tokens.expires_in, 3600)
            assert.deepStrictEqual(tokens.scope, 'XboxLive.signin XboxLive.offline_access')
            assert.deepStrictEqual(tokens.access_token, 'access_token_example')
            assert.deepStrictEqual(tokens.refresh_token, 'refresh_token_example')
            assert.deepStrictEqual(tokens.user_id, 'user_id_example')

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    it('should get a new user token when invoking getUserToken()', function(done){
        this.auth.getUserToken('abc123').then(function(tokens){
            assert.deepStrictEqual(tokens.IssueInstant, '2020-10-29T08:18:44.2057145Z')
            assert.deepStrictEqual(tokens.NotAfter, '2020-11-12T08:18:44.2057145Z')
            assert.deepStrictEqual(tokens.Token, 'user_token_data')
            assert.deepStrictEqual(tokens.DisplayClaims.xui[0].uhs, 'userhash_data')

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    it('should get a new xsts token when invoking getXstxToken()', function(done){
        this.auth.getXstsToken('abc123').then(function(tokens){
            assert.deepStrictEqual(tokens.IssueInstant, '2020-11-05T18:04:47.6292327Z')
            assert.deepStrictEqual(tokens.NotAfter, '2020-11-06T10:04:47.6292327Z')
            assert.deepStrictEqual(tokens.Token, 'xsts_token_data')
            assert.deepStrictEqual(tokens.DisplayClaims.xui[0].gtg, 'gamertag_data')
            assert.deepStrictEqual(tokens.DisplayClaims.xui[0].xid, 'xid_data')
            assert.deepStrictEqual(tokens.DisplayClaims.xui[0].uhs, 'uhs_data')
            assert.deepStrictEqual(tokens.DisplayClaims.xui[0].agg, 'Adult')
            assert.deepStrictEqual(tokens.DisplayClaims.xui[0].usr, 'usr_data')
            assert.deepStrictEqual(tokens.DisplayClaims.xui[0].utr, 'utr_data')
            assert.deepStrictEqual(tokens.DisplayClaims.xui[0].prv, 'prv_data')

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    it('should refresh all tokens', function(done){
        this.auth._tokens.oauth.refresh_token = 'abc123'
        this.auth.refreshTokens().then(function(){
            assert.deepStrictEqual(true, true)

            done()
        }).catch(function(error){
            assert.deepStrictEqual(true, error)
            done()
        })
    })

    afterEach(function() {
        delete this.auth
    });

    after(function() {
        this.serverRun.close()
    });
})