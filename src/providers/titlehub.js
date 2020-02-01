const request = require('request')
const BaseProvider = require('./base.js')

module.exports = function(client)
{
    var Provider = BaseProvider(client, 'https://titlehub.xboxlive.com')

    Provider.find_title = function(title){
        return this.post('titles/batch/decoration/detail', {
            "pfns": [
                title
            ],
            "windowsPhoneProductIds": []
        })
    }

    Provider.get_title = function(title){
        var xid = this.client.auth_manager.xsts_token.DisplayClaims.xui[0].xid
        return this.get('users/xuid('+xid+')/titles/titleid('+title+')/decoration/detail')
    }

    return Provider
}
