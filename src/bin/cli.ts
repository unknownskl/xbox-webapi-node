#!/usr/bin/env node
import yargs from 'yargs'
import ownPackage from '../../package.json'
import XboxWebApi from '../lib'

import { Xal, Msal, TokenStore } from 'xal-node'

class Cli {
    _yargs:yargs
    _tokenStore:TokenStore
    _xal:Xal|Msal

    constructor() {

        this._yargs = yargs
            .scriptName("xbox-webapi")
            .usage('$0 <cmd> [args]')
            .version(ownPackage.version)
            .detectLocale(false)
            .wrap(yargs.terminalWidth())
            .demandCommand(1, 'You need to specify a command. Use --help to see available commands.');

        this._tokenStore = new TokenStore()
        this._tokenStore.load('./.xbox.tokens.json')
        this._tokenStore.getAuthenticationMethod()
        if(this._tokenStore.getAuthenticationMethod() === 'msal'){
            this._xal = new Msal(this._tokenStore)
        } else {
            this._xal = new Xal(this._tokenStore)
        }

        // Load providers and commands
        this._yargs = this._populateCommands(this._yargs)

        this._yargs.option('verbose', {
            alias: 'v',
            type: 'boolean',
            description: 'Run with verbose logging'
        })

        this._yargs.option('output', {
            alias: 'o',
            type: 'string',
            description: 'Output',
            default: 'table'
        }).choices('output', ['table', 'json', 'jsonp'])

        yargs.option('continuationToken', {
            alias: 'c',
            type: 'number',
            description: 'Continuation token',
        }).option('maxItems', {
            alias: 'n',
            type: 'number',
            description: 'Max items',
        }).option('skipItems', {
            alias: 's',
            type: 'number',
            description: 'Skip items',
        }).option('market', {
            alias: 'm',
            type: 'string',
            description: 'Market',
            default: 'US'
        }).option('language', {
            alias: 'l',
            type: 'string',
            description: 'Language',
            default: 'en-US'
        })
    }

    run() {
        this._yargs.argv
    }

    _getFunctionArgs(func) {
        const args = func.toString().match(/\(([^)]*)\)/);
        const args2 = args ? args[1].split(',').map(arg => arg.trim().split(' ')[0]).filter(arg => arg) : [];
        return args2
    }

    _populateCommands(yargs: yargs) {
        // Load providers and commands

        // Create dummy api and check ffor providers and commands in class
        const dummyApi = new XboxWebApi({
            uhs: 'dummy',
            token: 'dummy'
        });

        for(const provider in dummyApi.providers){
            const commands = this._getCommandsFromProvider(dummyApi.providers[provider])
            
            yargs.command(
                `${provider} [command]`,
                `${provider} provider`,
                (yargs) => {
                    
                    // Setup commands in providers
                    for(const command in commands){
                        const functionArgs = this._getFunctionArgs(dummyApi.providers[provider][commands[command]])

                        const functionArgsFiltered = functionArgs.filter((arg) => {
                            return arg !== 'continuationToken' &&
                                arg !== 'maxItems' &&
                                arg !== 'skipItems'
                        })

                        const commandStr = commands[command] + '' + (functionArgsFiltered.length > 0 ? ' [' + functionArgsFiltered.join('] [') + ']' : '')
                        const descriptionStr = ''

                        yargs.command(
                            commandStr,
                            descriptionStr,
                            (yargs) => {
                                for(const arg in functionArgs){
                                    yargs.positional(functionArgs[arg], {
                                        type: 'string',
                                    });
                                }
                            },
                            (argv) => {
                                this._xal.getWebToken().then((token) => {

                                    const api = new XboxWebApi({
                                        uhs: token.data.DisplayClaims.xui[0].uhs,
                                        token: token.data.Token,
                                    })

                                    const args = <any>[];
                                    for(const arg in functionArgs){
                                        args.push(argv[functionArgs[arg]])
                                    }

                                    if(argv.verbose === true)
                                        console.log(`Running command: ${provider}::${commands[command]}(${args})`);
    
                                    api.providers[provider][commands[command]](...args).then((result) => {

                                        // Render output
                                        if(argv.output === 'json'){
                                            console.log(JSON.stringify(result))
                                            
                                        } else if(argv.output === 'jsonp'){
                                            console.log(JSON.stringify(result, null, 2))
                                            
                                        } else {
                                            console.table(result)
                                        }

                                    }).catch((error) => {
                                        console.log('Failed to execute command:', error)
                                    })

                                }).catch((error) => {
                                    console.log('Failed to retrieve web token:', error)
                                })
                            }
                        );
                    }

                },
                (argv) => {
                    yargs.showHelp()
                }
            );
        }

        return yargs
    }

    _getCommandsFromProvider(provider: any) {
        const cmds:string[] = []
        const commands = Object.getOwnPropertyNames(Object.getPrototypeOf(provider))
        for(const command in commands){
            if(commands[command] === 'constructor')
                continue;

            if(commands[command].startsWith('_'))
                continue;

            // console.log('command:', commands[command])
            cmds.push(commands[command])
        }

        return cmds
    }
}

const cli = new Cli();
cli.run()