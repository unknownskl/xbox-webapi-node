const cli = require('cli-ux').cli
const baseDecorator = require('./base')

module.exports = {

    getFriends: function(provider, params){
        return new Promise((resolve, reject) => {

            const task = provider[params[1]](...params.slice(2)).then((data) => { 

                cli.table(data.people, {
                    'xuid': {},
                    'isFavorite': {},
                    'displayName': {},
                    'realName': {},
                    'gamerScore': {},
                    'xboxOneRep': {},
                    'presenceState': {},
                    'presenceText': {},
                    'presenceDevices': {},
                    'isFollowingCaller': {},
                    'isFollowedByCaller': {},
                    'goldSubscription': { get: row => `${row.detail.accountTier}`}
                }, baseDecorator.getTableOptions(params))

                // const single = baseDecorator.singleObjectTable(data.ListMetadata)
                // cli.table(single, {
                //     'key': {},
                //     'value': {},
                // }, baseDecorator.getTableOptions(params))

            }).catch((error) => {
                reject(error)
            })
        })
    },

}