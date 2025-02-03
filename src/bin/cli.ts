import XboxWebApi from '../lib'
import { Xal, TokenStore } from 'xal-node'

const tokenStore = new TokenStore()
const xal = new Xal(tokenStore)
tokenStore.load('./.xbox.tokens.json')

xal.getWebToken().then((token) => {
    console.log(token.data.DisplayClaims.xui[0].uhs)

    const client = new XboxWebApi({
        uhs: token.data.DisplayClaims.xui[0].uhs,
        token: token.data.Token,
        // market: 'nl-nl'
    })

    console.log(client)

    client.providers.smartglass.getConsolesList().then((consoles) => {
        console.log(consoles)
        console.log(JSON.stringify(consoles))

    }).catch((error) => {
        console.log('Failed to retrieve consoles:', error)
    })

}).catch((error) => {
    console.log('Failed to retrieve web token:', error)
})

