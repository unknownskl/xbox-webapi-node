var XboxApiClient = require('../src/client.js');
var TokenStore = require('../src/tokenstore.js');

var token_store = TokenStore()
var client = XboxApiClient(token_store)

client.authenticate().then(function(user_info){
    client.provider('titlehub').get_title('442736763').then(function(data){

        console.log('data', user_info, data)

    }).catch(function(error){
        console.log('error', error)
    })

}).catch(function(error){
    console.log('error', error)
})
