import { HttpResponse } from '../lib/http'
import { UserstatResponse } from '../types/userstats'

import BaseProvider from './base'

export default class UserstatsProvider extends BaseProvider {
    _endpoint = 'userstats.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '2'
    }

    async getUserTitleStats(xuid:string, titleId:string): Promise<HttpResponse<UserstatResponse>> {
        return (await this.post('/batch', 
            {
                "arrangebyfield":"xuid",
                "xuids":[
                    xuid
                ],
                "groups":[
                    {
                        "name":"Hero",
                        "titleId": titleId
                    }
                ],
                "stats":[
                    {
                        "name":"MinutesPlayed",
                        "titleId": titleId
                    }
                ]
            }
        ))
    }
}