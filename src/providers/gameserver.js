const request = require('request')
const BaseProvider = require('./base.js')

module.exports = function(client)
{
    var Provider = BaseProvider(client, 'https://gameserverds.xboxlive.com')

    Provider.get_qos_servers = function(){
        return this.get('qosservers')
    }

    return Provider
}
