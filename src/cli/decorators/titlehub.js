const cli = require('cli-ux').cli
const baseDecorator = require('./base')

module.exports = {

    getTitleHistory: function(provider, params){
        return new Promise((resolve, reject) => {

            const task = provider[params[1]](...params.slice(2)).then((data) => { 

                cli.table(data.titles, {
                    'titleId': {},
                    'pfn': {},
                    'name': {},
                    'type': {},
                    'xboxLiveTier': {},
                }, baseDecorator.getTableOptions(params))

            }).catch((error) => {
                reject(error)
            })
        })
    },

    getTitleId: function(provider, params){
        return new Promise((resolve, reject) => {

            const task = provider[params[1]](...params.slice(2)).then((data) => { 

                const single = baseDecorator.singleObjectTable(data.titles[0])
                if(data.titles.length > 1){
                    cli.warn('Titlehub unexpectedly returned more then one title. Some data may not be visible')
                }   

                cli.table(single, {
                    'key': {},
                    'value': {},
                }, baseDecorator.getTableOptions(params))

            }).catch((error) => {
                reject(error)
            })
        })
    }

}