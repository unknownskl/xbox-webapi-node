const request = require('request')

module.exports = function(client, host, headers)
{
    return {
        host: host,
        client: client,

        get: function(path){
            return new Promise(function(resolve, reject) {
                request.get({
                    url: this.host+'/'+path,
                    headers: this.client.get_http_headers(headers)
                }, (error, res, body) => {
                    this.client.check_http_response(error, res, body, resolve, reject)
                })
            }.bind(this))
        },

        post: function(path, data){
            return new Promise(function(resolve, reject) {
                request.post({
                    url: this.host+'/'+path,
                    headers: this.client.get_http_headers(headers),
                    json: data
                }, (error, res, body) => {
                    this.client.check_http_response(error, res, body, resolve, reject)
                })
            }.bind(this))
        }
    }
}
