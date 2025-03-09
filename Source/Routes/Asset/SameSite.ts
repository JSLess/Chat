
export { onlySameSite }

import { Context } from 'Oak'
import { Status } from 'Misc'


const notice = `
    Check the GitHub repository for this asset at:
    https://github.com/JSLess/Chat/tree/Stable/Source/Static
`


function onlySameSite (
    context : Context ,
    next : () => Promise<any>
){

    const { response , request } = context

    const referer = request.headers.get('referer')

    if( ! referer ){
        response.status = Status.MisdirectedRequest
        response.body = notice
        return
    }

    try {

        const url = new URL(referer)

        if( url.host !== context.request.url.host ){
            response.status = Status.MisdirectedRequest
            response.body = notice
            return
        }

        return next()

    } catch {
        response.status = Status.BadRequest
        response.body = `Malformed Referer`
        return
    }
}
