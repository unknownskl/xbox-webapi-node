var authentication = require('../src/authentication.js');
const querystring = require('querystring')

auth_manager = authentication()
auth_manager.setUserAuth('invalid@mail.com', 'abc123')

if(process.argv[2] != undefined){
    var return_url = process.argv[2].split('#')
    var parsed = querystring.parse(return_url[1])

    auth_manager.access_token = parsed.access_token
    auth_manager.refresh_token = parsed.refresh_token
    auth_manager.user_id = parsed.user_id
}

auth_manager.authenticate().then(function(user){
    console.log(user)
}).catch(function(error){
    console.log(error)
})
