const cli = require('cli-ux').cli
const baseDecorator = require('./base')

module.exports = {

    getConsolesList: function(provider, params){
        return new Promise((resolve, reject) => {

            const task = provider[params[1]](...params.slice(2)).then((data) => {  
                cli.table(data.result, {
                    'id': {},
                    'name': {},
                    'locale': {},
                    'region': {},
                    'consoleType': {},
                    'powerState': {},
                    'digitalAssistantRemoteControlEnabled': { header: 'Digital Assistant' },
                    'remoteManagementEnabled': { header: 'Remote Management' },
                    'consoleStreamingEnabled': { header: 'Console Streaming' },
                    'wirelessWarning': { extended: true },
                    'outOfHomeWarning': { extended: true },
                    'storageDevices': { extended: true },
                }, baseDecorator.getTableOptions(params))

            }).catch((error) => {
                reject(error)
            })
        })
    },

    getConsoleStatus: function(provider, params){
        return new Promise((resolve, reject) => {

            if(params[2] === undefined){
                reject({ error: 'Parameter consoleId is required'})
                return
            }

            const task = provider[params[1]](...params.slice(2)).then((data) => { 

                const single = baseDecorator.singleObjectTable(data)
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