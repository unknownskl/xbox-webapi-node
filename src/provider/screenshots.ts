import BaseProvider from './base'

export default class ScreenshotsProvider extends BaseProvider {
    _endpoint = 'screenshotsmetadata.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '5'
    }

    async getScreenshots(continuationToken = undefined, maxItems = undefined, skipItems = undefined): Promise<any> {
        return (await this.get(this.applyPagination('/users/me/screenshots', maxItems, skipItems, continuationToken)))
    }

    async getScreenshotsByTitleId(titleId:string, continuationToken = undefined, maxItems = 10, skipItems = undefined): Promise<any> {
        return (await this.get(this.applyPagination('/public/titles/'+titleId+'/screenshots?qualifier=created', maxItems, skipItems, continuationToken)))
    }

    async getScreenshotsByXuid(xuid:string, continuationToken = undefined, maxItems = undefined, skipItems = undefined): Promise<any> {
        return (await this.get(this.applyPagination('/users/xuid('+xuid+')/screenshots', maxItems, skipItems, continuationToken)))
    }
}