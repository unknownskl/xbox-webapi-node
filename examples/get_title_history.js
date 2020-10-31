var XboxApiClient = require('../src/client')

var client = XboxApiClient({
    clientId: '5e5ead27-ed60-482d-b3fc-702b28a97404'
})

client.isAuthenticated().then(function(){

    client.getProvider('titlehub').getTitleHistory().then(function(result){

        var i = 0
        for(let game in result.titles){
            console.log('- '+result.titles[game].mediaItemType+': '+result.titles[game].name+' '+result.titles[game].displayImage)
            i++

            if(i == 1){
                // Get last played game details
                // console.log(result.titles[game])

                client.getProvider('titlehub').getTitleId(result.titles[game].titleId).then(function(titleDetails){
                    console.log(titleDetails.titles[0])
                }).catch(function(error){
                    console.log('reject', error)
                })
            }

            if(i >= 5){
                break
            }
        }

    }).catch(function(error){
        console.log('reject', error)
    })

}).catch(function(error){
    console.log('User is not authenticated. Run authentication flow first.', error)
})