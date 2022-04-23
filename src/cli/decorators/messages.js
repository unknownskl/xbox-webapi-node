const cli = require('cli-ux').cli
const baseDecorator = require('./base')

module.exports = {

    getInbox: function(provider, params){
        return new Promise((resolve, reject) => {

            const task = provider[params[1]](...params.slice(2)).then((data) => { 

                cli.table(data.primary.conversations, {
                    'conversationId': {},
                    'folder': {},
                    'networkId': {},
                    'type': {},
                    'timestamp': {},
                    'participants': {},
                    'notificationOptions': {},
                    'isRead': {},
                }, baseDecorator.getTableOptions(params))

                const single = baseDecorator.singleObjectTable(data.safetySettings)
                cli.table(single, {
                    'key': {},
                    'value': {},
                }, baseDecorator.getTableOptions(params))

            }).catch((error) => {
                reject(error)
            })
        })
    },

    getConversation: function(provider, params){
        return new Promise((resolve, reject) => {

            const task = provider[params[1]](...params.slice(2)).then((data) => { 

                cli.table(data.messages, {
                    'messageId': {},
                    'timestamp': {},
                    'type': {},
                    'sender': {},
                    'isDeleted': {},
                    'isServerUpdated': {},
                    'contentPayload': { get: row => {
                        let content = []
                        for(const part in row.contentPayload.content.parts){
                            if(row.contentPayload.content.parts[part].contentType === 'text'){
                                content.push(`${row.contentPayload.content.parts[part].contentType}: ${row.contentPayload.content.parts[part].text}`)

                            } else {
                                content.push(`${row.contentPayload.content.parts[part].contentType}: ${JSON.stringify(row.contentPayload.content.parts[part])}`)
                            }
                            
                        }
                        return content.join('\n')
                    }},
                }, baseDecorator.getTableOptions(params))

                const single = baseDecorator.singleObjectTable(data)
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