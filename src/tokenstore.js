var fs = require('fs');

module.exports = function(tokenfile = '.tokens.json')
{
    return {
        file: tokenfile,

        tokens: {},

        load: function(){
            try {
                var token_store = fs.readFileSync(this.file).toString();
                token_store = JSON.parse(token_store)
                this.tokens = token_store
            }
            catch(error){
                this.tokens = {}
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
