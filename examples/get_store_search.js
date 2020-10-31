var XboxApiClient = require('../src/client')

var client = XboxApiClient({
    clientId: '5e5ead27-ed60-482d-b3fc-702b28a97404'
})

client.isAuthenticated().then(function(){

    // client.getProvider('catalog').searchTitle('Destiny 2').then(function(result){
    client.getProvider('catalog').getProductFromAlternateId('371594669','XboxTitleId').then(function(result){

        console.log('resolve', result.Products[0])

    }).catch(function(error){
        console.log('reject', error)
    })

}).catch(function(error){
    console.log('User is not authenticated. Run authentication flow first.', error)
})