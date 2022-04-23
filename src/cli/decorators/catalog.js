const cli = require('cli-ux').cli
const baseDecorator = require('./base')

module.exports = {

    searchTitle: function(provider, params){
        return new Promise((resolve, reject) => {

            if(params[2] === undefined){
                reject({ error: 'Parameter query is required'})
                return
            }

            if(params[3] !== undefined && params[3] !== 'XboxTitleId' && params[3].substr(0, 1) !== '-'){
                reject({ error: 'Parameter titleType should be \'XboxTitleId\''})
                return
            }

            const task = provider[params[1]](...params.slice(2)).then((data) => {  
                const products = []
                for(const product in data.Results){
                    products.push(data.Results[product].Products[0])

                    if(data.Results[product].Products.length > 1){
                        cli.warn('Catalog product has more then one product. Not all data is visible')
                    }
                }
                
                cli.table(products, {
                    'ProductId': {},
                    'Title': {},
                    'Type': {},
                    'PlatformProperties': {},
                    'Icon': { get: row => `https:${row.Icon}`}
                }, baseDecorator.getTableOptions(params))

            }).catch((error) => {
                reject(error)
            })
        })
    },

    getProductId: function(provider, params){
        return new Promise((resolve, reject) => {

            if(params[2] === undefined){
                reject({ error: 'Parameter productId is required'})
                return
            }

            const task = provider[params[1]](...params.slice(2)).then((data) => {  
                const single = baseDecorator.singleObjectTable(data.Products[0])
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