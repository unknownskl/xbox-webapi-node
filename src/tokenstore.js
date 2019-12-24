var fs = require('fs');

module.exports = function(tokenfile = '.tokens.json')
{
    // Read tokens from ENV
    var default_tokens = {}
    if(process.env.SMARTGLASS_ACCESS_TOKEN != undefined){
        default_tokens['access_token'] = process.env.SMARTGLASS_ACCESS_TOKEN
    }
    if(process.env.SMARTGLASS_REFRESH_TOKEN != undefined){
        default_tokens['refresh_token'] = process.env.SMARTGLASS_REFRESH_TOKEN
    }

    return {
        file: tokenfile,

        tokens: {},
        env_tokens: default_tokens,

        load: function(){
            try {
                var token_store = fs.readFileSync(this.file).toString();
                token_store = JSON.parse(token_store)

                for(let token in token_store){
                    this.set(token, token_store[token])
                }

                for(let token in this.env_tokens){
                    this.set(token, this.env_tokens[token])
                }
            }
            catch(error){
                // Ignore load error
            }

            return this.tokens
        },

        save: function(){
            try {
                fs.writeFileSync(this.file, JSON.stringify(this.tokens));
                return true
            }
            catch(error){
                // console.log(error)
                return error
            }
        },

        set: function(key, value){
            this.tokens[key] = value
        },

        get: function(key){
            return this.tokens[key]
        },

        delete: function(key){
            return this.tokens[key] = undefined
        }
    }
}
