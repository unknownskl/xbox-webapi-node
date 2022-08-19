const cli = require('cli-ux').cli
const baseDecorator = require('./base')

module.exports = {

    getUserTitleStats: function(provider, params){
        return new Promise((resolve, reject) => {

            const task = provider[params[1]](...params.slice(2)).then((data) => { 

                for(const stat in data.groups[0].statlistscollection){
                    cli.table(data.groups[0].statlistscollection[stat].stats, {
                        'name': {},
                        'type': {},
                        'value': {},
                        'groupproperties': {},
                        'properties': {},
                    }, baseDecorator.getTableOptions(params))
                }

                cli.table(data.statlistscollection[0].stats, {
                    'titleid': {},
                    'name': {},
                    'type': {},
                    'value': {},
                    'groupproperties': {},
                    'properties': {},
                }, baseDecorator.getTableOptions(params))

            }).catch((error) => {
                reject(error)
            })
        })
    }

}