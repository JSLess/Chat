
export { middleware as onlySameSite }

import { Context } from 'Oak'


const notice = `
    Check the GitHub repository for this asset at:
    https://github.com/JSLess/Chat/tree/Stable/Source/Static
`


function middleware (
    context : Context ,
    next : () => Promise<any>
){

    const referer = context.request.headers.get('referer')

    console.log('check external',referer)


    if( ! referer ){
        context.response.status = 421
        context.response.body = notice
        return
    }

    try {

        const url = new URL(referer)

        if( url.host !== context.request.url.host ){
            context.response.status = 421
            context.response.body = notice
            return
        }

        return next()

    } catch {
        context.response.status = 400
        context.response.body = `Malformed Referer`
        return
    }
}
