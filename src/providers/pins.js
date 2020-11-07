const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_pins')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://eplists.xboxlive.com'

    provider._headers['Content-Type'] = 'application/json'

    provider.getPins = function(){
        Debug('getPins()')

        return this.get('/users/xuid('+this._client._authentication._user.xid+')/lists/PINS/XBLPins')
    }

    return provider
}