const request = require('request')
const BaseProvider = require('./base.js')

module.exports = function(client)
{
    var Provider = BaseProvider(client, 'https://social.xboxlive.com')

    Provider.get_friends_list = function(){
        return this.get('/users/me/people?view=Favorite')
    }

    return Provider
}
