var fs = require('fs');

module.exports = function(tokenfile = '.tokens.json')
{
    return {
        file: tokenfile,

        tokens: false,

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
        }
    }
}
