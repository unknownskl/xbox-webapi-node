const request = require('request')
const BaseProvider = require('./base.js')

module.exports = function(client)
{
    var Provider = BaseProvider(client, 'https://inventory.xboxlive.com')

    Provider.get_inventory = function(){
        return this.get('users/me/inventory')
    }

    return Provider
}
