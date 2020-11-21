var XboxApiClient = require('../src/client')

var client = XboxApiClient({
    clientId: '5e5ead27-ed60-482d-b3fc-702b28a97404'
})

client.isAuthenticated().then(function(){
    console.log('User is authenticated.')

    client.getProvider('smartglass').getConsolesList().then(function(result){
        console.log('resolve', result)

        var  consoleId = result.result[0].id

        client.getProvider('catalog').searchTitle('Twitch').then(function(result){
            console.log('Launching app/game:', result.Results[0].Products[0].Title, '('+result.Results[0].Products[0].ProductId+')')

            client.getProvider('smartglass').launchApp(consoleId, result.Results[0].Products[0].ProductId).then(function(resultLaunch){
                console.log('App launched on console:', resultLaunch)
            }).catch(function(error){
                console.log('reject', error)
            })

        }).catch(function(error){
            console.log('reject', error)
        })

    }).catch(function(error){
        console.log('reject', error)
    })

}).catch(function(error){
    console.log('User is not authenticated. Run authentication flow first.', error)
})