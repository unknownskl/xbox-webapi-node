const request = require('request')
const BaseProvider = require('./base.js')

module.exports = function(client)
{
    var Provider = BaseProvider(client, 'https://msg.xboxlive.com')

    Provider.get_inbox = function(){
        var xid = this.client.auth_manager.xsts_token.DisplayClaims.xui[0].xid
        return this.get('users/xuid('+xid+')/inbox')
    }

    Provider.get_message = function(message_id){
        var xid = this.client.auth_manager.xsts_token.DisplayClaims.xui[0].xid
        return this.get('users/xuid('+xid+')/inbox/'+message_id)
    }

    return Provider
}
