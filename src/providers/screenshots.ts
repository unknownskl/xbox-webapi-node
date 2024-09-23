import BaseProvider from './base'

const QueryString = require('querystring')
const Debug = require('debug')('xbox-webapi-node:provider_screenshots')

interface ScreenshotsParams {
    skip_items: number,
    max_items: number,
    title_id?: string
}

export default class ScreenshotsProvider extends BaseProvider {
    _endpoint = 'https://screenshotsmetadata.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '3'
    }

    getUserScreenshots() {
        Debug('getUserScreenshots()')

        return this.get('/users/me/screenshots')
        // return this.get('/users/me/scids/d1adc8aa-0a31-4407-90f2-7e9b54b0347c/screenshots/06e5ed92-8508-4a7f-9ba0-94fb945ec20e/views')
        
    }

    getCommunityScreenshotsByTitleId(titleId:string) {
        Debug('getCommunityScreenshotsByTitleId()')

        return this.get('/public/titles/'+titleId+'/screenshots?qualifier=created&maxItems=10')
    }

    getScreenshotsByXuid(xuid:string, titleId?:string, skipItems:number = 0, maxItems:number = 25) {
        Debug('getScreenshotsByXuid()')

        var params:ScreenshotsParams = {
            skip_items: skipItems,
            max_items: maxItems
        }

        if(titleId !== undefined){
            params.title_id = titleId
        }

        var queryParams = QueryString.stringify(params)

        return this.get('/users/xuid('+xuid+')/screenshots?'+queryParams)
    }
}