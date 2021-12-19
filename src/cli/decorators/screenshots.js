const cli = require('cli-ux').cli
const baseDecorator = require('./base')

module.exports = {

    getUserScreenshots: function(provider, params){
        return new Promise((resolve, reject) => {

            const task = provider[params[1]](...params.slice(2)).then((data) => { 

                cli.table(data.screenshots, {
                    'screenshotId': {},
                    'state': {},
                    'resolutionHeight': { extended: true },
                    'resolutionWidth': { extended: true },
                    'dateTaken': {},
                    'titleName': {},
                    'type': {},
                    'titleId': {},
                    'rating': {},
                    'ratingCount': {},
                    'views': {},
                    'achievementId': {},
                    'deviceType': {},
                    'screenshotUris': {},
                }, baseDecorator.getTableOptions(params))

                const single = baseDecorator.singleObjectTable(data.pagingInfo)
                cli.table(single, {
                    'key': {},
                    'value': {},
                }, baseDecorator.getTableOptions(params))

            }).catch((error) => {
                reject(error)
            })
        })
    },

    getCommunityScreenshotsByTitleId: function(provider, params){
        return new Promise((resolve, reject) => {

            const task = provider[params[1]](...params.slice(2)).then((data) => { 

                cli.table(data.screenshots, {
                    'screenshotId': {},
                    'state': {},
                    'resolutionHeight': { extended: true },
                    'resolutionWidth': { extended: true },
                    'dateTaken': {},
                    'titleName': {},
                    'type': {},
                    'titleId': {},
                    'rating': {},
                    'ratingCount': {},
                    'views': {},
                    'achievementId': {},
                    'deviceType': {},
                    'screenshotUris': {},
                }, baseDecorator.getTableOptions(params))

                const single = baseDecorator.singleObjectTable(data.pagingInfo)
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