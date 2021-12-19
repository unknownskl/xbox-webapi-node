const cli = require('cli-ux').cli
const baseDecorator = require('./base')

module.exports = {

    getPins: function(provider, params){
        return new Promise((resolve, reject) => {

            const task = provider[params[1]](...params.slice(2)).then((data) => { 

                cli.table(data.ListItems, {
                    'Index': {},
                    'KValue': {},
                    'DateAdded': {},
                    'DateModified': {},
                    'Item': {},
                }, baseDecorator.getTableOptions(params))

                const single = baseDecorator.singleObjectTable(data.ListMetadata)
                cli.table(single, {
                    'key': {},
                    'value': {},
                }, baseDecorator.getTableOptions(params))

            }).catch((error) => {
                reject(error)
            })
        })
    },

}