import BaseProvider from './base'
const Debug = require('debug')('xbox-webapi-node:provider_pins')

export default class PinsProvider extends BaseProvider {
    _endpoint = 'https://eplists.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '3',
        'Accept-Language': 'en-US'
    }

    getPins(list = 'XBLPins'){
        Debug('getPins('+list+')')

        return this.get('/users/xuid('+this._client._authentication._user?.xid+')/lists/PINS/'+list)
    }

    getSaveForLater(){
        Debug('getSaveForLater()')

        return this.get('/users/xuid('+this._client._authentication._user?.xid+')/lists/PINS/SaveForLater')
    }
}