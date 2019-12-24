const request = require('request')

module.exports = function(client)
{
    return {
        host: 'https://titlehub.xboxlive.com',
        client: client,

        get: function(path){
            return new Promise(function(resolve, reject) {
                request.get({
                    url: this.host+'/'+path,
                    headers: this.client.get_http_headers()
                }, (error, res, body) => {
                    this.client.check_http_response(error, res, body, resolve, reject)
                })
            }.bind(this))
        },

        post: function(path, data){
            return new Promise(function(resolve, reject) {
                request.post({
                    url: this.host+'/'+path,
                    headers: this.client.get_http_headers(),
                    json: data
                }, (error, res, body) => {
                    this.client.check_http_response(error, res, body, resolve, reject)
                })
            }.bind(this))
        }
    }
}
