import https from 'https'
import http from 'http'
const UrlParser = require('url')

const Debug = require('debug')('xbox-webapi-node:http')

interface HttpClientConfig {
    hostname: string
    port: number
    path: string
    method: 'GET'|'POST',
    headers: {
        [name: string]: string
    }
}

export default class HttpClient {

    get(url:string, headers?:any):Promise<string> {
        Debug('- HTTP GET call start')
        return new Promise((resolve, reject) => {

            // Extract options from url
            var parsedUrl = this.queryUrl(url)

            const options:HttpClientConfig = {
                hostname: parsedUrl.host,
                port: parsedUrl.port,
                path: parsedUrl.path,
                method: 'GET',
                headers: { },
            }

            for(const header in headers){
                options.headers[header]  = headers[header]
            }

            Debug('HTTP request options:', options)

            let httpEngine:typeof http|typeof https = http

            if(parsedUrl.protocol == 'https'){
                httpEngine = https
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

        })
    }

    post(url:string, headers:any, postdata:string):Promise<string> {
        Debug('- HTTP POST call start')
        return new Promise((resolve, reject) => {

            // Extract options from url
            var parsedUrl = this.queryUrl(url)

            const options:HttpClientConfig = {
                hostname: parsedUrl.host,
                port: parsedUrl.port,
                path: parsedUrl.path,
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': postdata.length.toString()
                },
            }

            for(const header in headers){
                options.headers[header]  = headers[header]
            }

            Debug('HTTP request options:', options)
            Debug('HTTP request body:', postdata)

            let httpEngine:typeof http|typeof https = http

            if(parsedUrl.protocol == 'https'){
                httpEngine = https
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

        })
    }

    queryUrl(url:string){
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