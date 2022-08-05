#!/usr/bin/env node
const cli = require('cli-ux').cli
const ux = require('cli-ux').ux

const XboxApi = require('../client')

const SmartglassDecorator = require('./decorators/smartglass')
const CatalogDecorator = require('./decorators/catalog')
const TitlehubDecorator = require('./decorators/titlehub')
const PinsDecorator = require('./decorators/pins')
const PeopleDecorator = require('./decorators/people')
const AchievementsDecorator = require('./decorators/achievements')
const ScreenshotsDecorator = require('./decorators/screenshots')
const MessagesDecorator = require('./decorators/messages')
const UserpresenceDecorator = require('./decorators/userpresence')
const UserstatsDecorator = require('./decorators/userstats')

var XboxApiClient = XboxApi({
    clientId: '5e5ead27-ed60-482d-b3fc-702b28a97404'
})

// Check if user is authenticated
XboxApiClient.isAuthenticated().then(function(){
    // User is authenticated
    app.init()

}).catch(function(error){
    // cli.action.stop('✖ User is not authenticated, run \'xbox-webapi auth\' to authenticate')
    cli.warn('You are currently not properly authenticated. Commands may fail. to login run \'xbox-webapi auth\'')

    app.init()
})

/**
 * App class
 *  */

const app = {

    _decorators: {
        'smartglass': SmartglassDecorator,
        'catalog': CatalogDecorator,
        'titlehub': TitlehubDecorator,
        'pins': PinsDecorator,
        'people': PeopleDecorator,
        'achievements': AchievementsDecorator,
        'screenshots': ScreenshotsDecorator,
        'messages': MessagesDecorator,
        'userpresence': UserpresenceDecorator,
        'userstats': UserstatsDecorator,
    },

    init: function(){
        // Check cli
        const params = process.argv.slice(2)
        if(params.length === 0){
            this.showHelp()

        } else {

            const availableProviders = []
            for(const provider in this.getAvailableProviders()){
                availableProviders.push(provider)
            }

            switch(params[0]){
                case 'auth':
                    this.runAuth()
                    break
                case 'help':
                    this.showHelp()
                    break
                default:
                    if(availableProviders.includes(params[0])){
                        this.runProvider(params)
                    } else {
                        this.showHelp()
                    }
                    break
            }
        }
    },

    showHelp: function(){
        cli.log('Xbox-Webapi v1.3.0')
        cli.log('Usage: xbox-webapi <command>')
        cli.log('Available commands:')
        cli.log('  auth')

        cli.log('\nAvailable providers:')
        for(const provider in this.getAvailableProviders()){
            cli.log(' ', provider)
        }
    },

    runAuth: function(){
        var url = XboxApiClient.startAuthServer(function(){

            XboxApiClient.isAuthenticated().then(function(){
                cli.action.stop('Authentication is done. User logged in as ' + XboxApiClient.getUserGamertag() + '\n')
    
            }).catch(function(error){
                cli.action.stop('Authentication error')
                cli.warn('Authentication error', error)
            })
        })
    
        cli.action.start('To authenticate, please authorize your client:', url)
    },

    getAvailableProviders: function(){
        return XboxApiClient._providers
    },

    getAvailableProviderActions: function(name){
        const provider = XboxApiClient.getProvider(name)

        var res = []
        for(var functionName in provider) {
            if(typeof provider[functionName] === "function") {
                if(functionName !== 'get' && functionName !== 'post' && functionName.substr(0, 1) !== '_'){
                    res.push(functionName)
                }
            }
        }
        return res
    },

    runProvider: function(params){
        const actions = this.getAvailableProviderActions(params[0])

        if(params[1] === undefined){
            cli.log('Xbox-Webapi v1.3.0')
            cli.log('Usage: xbox-webapi', params[0], '<command>')
            cli.log('Available actions:')
            
            for(const name in actions){
                cli.log(' ', actions[name])
            }
        } else {
            if(! actions.includes(params[1])){
                cli.log('Invalid action:', params[1])

            } else {
                const provider = XboxApiClient.getProvider(params[0])
                const taskFunction = provider[params[1]]

                if(this._decorators[params[0]] !== undefined && this._decorators[params[0]][params[1]] !== undefined){
                    this._decorators[params[0]][params[1]](provider, params).then((taskResult) => {
                        cli.log('taskResult:', taskResult)

                    }).catch((error) => {
                        cli.log('taskResult failed:', error)
                    })
                } else {

                    const task = provider[params[1]](params[2], params[3], params[4]).then((data) => {  
                        cli.log('Task success:', data)
    
                    }).catch((error) => {
                        cli.log('Task failed:', error)
                    })
                }
            }
        }
    }
}

