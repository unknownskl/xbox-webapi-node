var XboxApiClient = require('../src/client.js');
var TokenStore = require('../src/tokenstore.js');

var token_store = TokenStore()
var client = XboxApiClient(token_store)

client.authenticate().then(function(user_info){
    client.provider('userpresence').get('users/me').then(function(data){

        console.log('data', user_info, data)

    }).catch(function(error){
        console.log('error', error)
    })

}).catch(function(error){
    console.log('error', error)
})
