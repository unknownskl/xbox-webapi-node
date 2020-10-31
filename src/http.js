const Https = require('https')
const Http = require('http')
const UrlParser = require('url')

const Debug = require('debug')('xbox-webapi-node:http')

module.exports = function(){
    return {

        get: function(url, headers){
            Debug('- HTTP GET call start')
            return new Promise(function(resolve, reject) {

                // Extract options from url
                var parsedUrl = this.queryUrl(url)

                const options = {
                    hostname: parsedUrl.host,
                    port: parsedUrl.port,
                    path: parsedUrl.path,
                    method: 'GET',
                    headers: {
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        // 'Content-Length': postdata.length
                    },
                }

                for(let header in headers){
                    options.headers[header]  = headers[header]
                }

                Debug('HTTP request options:', options)

                var httpEngine = Http

                if(parsedUrl.protocol == 'https'){
                    httpEngine = Https
                }
    
                const req = httpEngine.request(options, (res) => {

                    var responseData = ''
                  
                    res.on('data', (data) => {
                        // Debug('HTTP response partial body:', data.toString())
                        responseData += data
                    })

                    res.on('close', () => {
                        Debug('HTTP response headers:', res.headers)
                        Debug('HTTP response body:', responseData.toString())

                        if(res.statusCode == 200){
                            resolve(responseData.toString())
                        } else {
                            reject({status: res.statusCode, body: responseData.toString()})
                        }
                    })
                })
                
                req.on('error', (error) => {
                    Debug('HTTP request error:', error)
                    reject(error)
                })

                req.end()

            }.bind(this))
        },

        post: function(url, headers, postdata){
            Debug('- HTTP POST call start')
            return new Promise(function(resolve, reject) {

                // Extract options from url
                var parsedUrl = this.queryUrl(url)

                const options = {
                    hostname: parsedUrl.host,
                    port: parsedUrl.port,
                    path: parsedUrl.path,
                    method: 'POST',
                    headers: {
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': postdata.length
                    },
                }

                for(let header in headers){
                    options.headers[header]  = headers[header]
                }

                Debug('HTTP request options:', options)
                Debug('HTTP request body:', postdata)

                var httpEngine = Http

                if(parsedUrl.protocol == 'https'){
                    httpEngine = Https
                }
    
                const req = httpEngine.request(options, (res) => {

                    var responseData = ''
                  
                    res.on('data', (data) => {
                        // Debug('HTTP response partial body:', data.toString())
                        responseData += data
                    })

                    res.on('close', () => {
                        Debug('HTTP response headers:', res.headers)
                        Debug('HTTP response body:', responseData.toString())

                        if(res.statusCode == 200){
                            resolve(responseData.toString())
                        } else {
                            reject({status: res.statusCode, body: responseData.toString()})
                        }
                    })
                })
                
                req.on('error', (error) => {
                    Debug('HTTP request error:', error)
                    reject(error)
                })
                
                req.write(postdata)
                req.end()

            }.bind(this))
        },

        queryUrl: function(url){
            var parsedUrl = UrlParser.parse(url)

            var defaultPort = 80
            var protocol = 'http'

            if(parsedUrl.protocol == 'https:'){
                defaultPort = 443
                protocol = 'https'
            }

            return {
                host: parsedUrl.hostname,
                protocol: protocol,
                port: parsedUrl.port || defaultPort,
                path: parsedUrl.path
            }
        }
        
    }
}