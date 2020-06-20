var XboxApiClient = require('../src/client.js');
var TokenStore = require('../src/tokenstore.js');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var token_store = TokenStore()
var client = XboxApiClient(token_store)

console.log(token_store)

client.authenticate().then(function(user_info){
    client.provider('titlehub').get_title('442736763').then(function(data){

        console.log('data', user_info, data)
        rl.close();

    }).catch(function(error){
        console.log('error', error)
        rl.close();
    })

}).catch(function(error){
    if(error.error == 'authentication.failed' || error.error == 'authentication.need_setup'){
        console.log('You are not authenticated. Please login first')

        startLoginFlow()
    } else {
        console.log('error', error)
        rl.close();
    }
})

function startLoginFlow(){
    console.log('Open the following link in your browser:', client.auth_manager._generate_authorization_url())
    console.log('Make sure to copy the address after the redirect and paste it in the field below.')

    rl.question('Copy url from browser and paste here: ', (response) => {
        // TODO: Log the answer in a database
        var results = client.process_authentication_response(response)


        // console.log(results.access_token, results.refresh_token)
        var token_store = TokenStore()
        console.log(token_store)
        token_store.set('access_token', results.access_token)
        token_store.set('refresh_token', results.refresh_token)
        token_store.delete('user_token')
        token_store.delete('xsts_token')
        token_store.save()
        console.log('token_store saved', token_store)
        // console.log('Attempting to login...')

        console.log('Done, restart app');

        rl.close();
    });
}