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

        // Add commands
        // .command(
        //     'greet [name]',
        //     'Greet a person',
        //     (yargs) => {
        //         yargs.positional('name', {
        //             type: 'string',
        //             default: 'World',
        //             describe: 'name to greet'
        //         });
        //     },
        //     (argv) => {
        //         console.log(`Hello, ${argv.name}!`);
        //     }
        // )

        // .command(
        //     'auth [type2]',
        //     'Authenticate using authentication method',
        //     (yargs) => {
        //         yargs
        //         // .positional('type2', {
        //         //     type: 'string',
        //         //     default: 'xal',
        //         //     describe: 'authentication method to use'
        //         // })
        //         .options({
        //             'type': {
        //                 description: 'Provide some details about the author of this program',
        //                 required: true,
        //                 alias: 'a',
        //             }
        //         })
        //     },
        //     (argv) => {
        //         console.log(`Hello, ${argv.type}!`);
        //     }
        // );

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
            type: 'string',
            description: 'Continuation token',
        }).option('maxItems', {
            alias: 'n',
            type: 'string',
            description: 'Max items',
        }).option('skipItems', {
            alias: 's',
            type: 'string',
            description: 'Skip items',
        })

        // // Add commands
        // .command(
        //     'greet [name]',
        //     'Greet a person',
        //     (yargs) => {
        //         yargs.positional('name', {
        //             type: 'string',
        //             default: 'World',
        //             describe: 'name to greet'
        //         });
        //     },
        //     (argv) => {
        //         console.log(`Hello, ${argv.name}!`);
        //     }
        // )
    }

    run() {
        this._yargs.argv
    }

    _getFunctionArgs(func) {
        const args = func.toString().match(/\(([^)]*)\)/);
        const args2 = args ? args[1].split(',').map(arg => arg.trim().split(' ')[0]).filter(arg => arg) : [];

        // filter continuationToken
        // return args2.filter((arg) => {
        //     return arg !== 'continuationToken'
        // })
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
                                if(argv.verbose === true)
                                    console.log(`Hello, Running command: ${provider}::${commands[command]}::${argv.args}`);

                                this._xal.getWebToken().then((token) => {

                                    const api = new XboxWebApi({
                                        uhs: token.data.DisplayClaims.xui[0].uhs,
                                        token: token.data.Token,
                                    })

                                    const args = <any>[];
                                    for(const arg in functionArgs){
                                        args.push(argv[functionArgs[arg]])
                                    }

                                    // Push continuation token
                                    if(argv.continuationToken){
                                        args.push(argv.continuationToken)
                                    }

                                    // Push max items
                                    if(argv.maxItems){
                                        args.push(argv.maxItems)
                                    }

                                    // Push skip items
                                    if(argv.skipItems){
                                        args.push(argv.skipItems)
                                    }

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

            if(commands[command].substring(0, 1) === '_')
                continue;

            // console.log('command:', commands[command])
            cmds.push(commands[command])
        }

        return cmds
    }
}

const cli = new Cli();
cli.run()

// Define commands and options
// const argv = yargs
//   .scriptName("mycli")
//   .usage('$0 <cmd> [args]')
//   .version(ownPackage.version)
//   .command(
//     'greet [name]',
//     'Greet a person',
//     (yargs) => {
//       yargs.positional('name', {
//         type: 'string',
//         default: 'World',
//         describe: 'name to greet'
//       });
//     },
//     (argv) => {
//       console.log(`Hello, ${argv.name}!`);
//     }
//   )
//   .option('verbose', {
//     alias: 'v',
//     type: 'boolean',
//     description: 'Run with verbose logging'
//   })
//   .demandCommand(1, 'You need to specify a command. Use --help to see available commands.')
//   .help()
//   .argv;

// Example usage:
// mycli greet --name Alice
// mycli greet --verbose


// import XboxWebApi from '../lib'
// import { Xal, TokenStore } from 'xal-node'
// import { hideBin } from 'yargs/helpers'


// const tokenStore = new TokenStore()
// const xal = new Xal(tokenStore)
// tokenStore.load('./.xbox.tokens.json')

// xal.getWebToken().then((token) => {
//     const client = new XboxWebApi({
//         uhs: token.data.DisplayClaims.xui[0].uhs,
//         token: token.data.Token,
//         // market: 'nl-nl'
//     })

//     client.providers.smartglass.getConsolesList().then((consoles) => {
//         console.log(consoles)
//         console.log(JSON.stringify(consoles))

//     }).catch((error) => {
//         console.log('Failed to retrieve consoles:', error)
//     })

// }).catch((error) => {
//     console.log('Failed to retrieve web token:', error)
// })

