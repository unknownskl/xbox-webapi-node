var XboxApiClient = require('../src/client')

var client = XboxApiClient({
    clientId: '5e5ead27-ed60-482d-b3fc-702b28a97404'
})

client.isAuthenticated().then(function(){
    console.log('User is authenticated.')

    client.isAuthenticated().then(function(){

        client.getProvider('smartglass').getConsolesList().then(function(result){
            console.log('resolve', result)

            for(let device in result.result){
                client.getProvider('smartglass').getConsoleStatus(result.result[device].id).then(function(result){
                    console.log('resolve', result)
            
                }).catch(function(error){
                    console.log('reject', error)
                })
            }

        }).catch(function(error){
            console.log('reject', error)
        })
    }).catch(function(error){
        console.log('reject', error)
    })

}).catch(function(error){
    console.log('User is not authenticated. Run authentication flow first.', error)
})