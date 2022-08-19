const cli = require('cli-ux').cli
const baseDecorator = require('./base')

module.exports = {

    getTitleAchievements: function(provider, params){
        return new Promise((resolve, reject) => {

            const task = provider[params[1]](...params.slice(2)).then((data) => { 

                cli.table(data.titles, {
                    'lastUnlock': {},
                    'titleId': {},
                    'titleType': {},
                    'platform': {},
                    'name': {},
                    'earnedAchievements': {},
                    'currentGamerscore': {},
                    'maxGamerscore': {},
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

    getTitleAchievements360: function(provider, params){
        return new Promise((resolve, reject) => {

            const task = provider[params[1]](...params.slice(2)).then((data) => { 

                cli.table(data.titles, {
                    'lastPlayed': {},
                    'titleId': {},
                    'titleType': {},
                    'platforms': {},
                    'name': {},
                    'currentAchievements': {},
                    'totalAchievements': {},
                    'currentGamerscore': {},
                    'totalGamerscore': {},
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

    getTitleId: function(provider, params){
        return new Promise((resolve, reject) => {

            const task = provider[params[1]](...params.slice(2)).then((data) => { 

                cli.table(data.achievements, {
                    'id': {},
                    'name': {},
                    'titleAssociations': { get: row => `${row.titleAssociations[0].name} (${row.titleAssociations[0].id})`},
                    'progressState': {},
                    'platforms': {},
                    'description': {},
                    'isSecret': {},
                    'achievementType': {},
                    'participationType': {},
                    'rewards': { get: row => `${row.rewards[0].type} (${row.rewards[0].value})`},
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