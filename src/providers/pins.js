const request = require('request')
const BaseProvider = require('./base.js')

module.exports = function(client)
{
    var Provider = BaseProvider(client, 'https://eplists.xboxlive.com')

    Provider.get_pins = function(list = 'XBLPins'){
        var xid = this.client.auth_manager.xsts_token.DisplayClaims.xui[0].xid
        return this.get('users/xuid('+xid+')/lists/PINS/'+list)
    }

    return Provider
}
