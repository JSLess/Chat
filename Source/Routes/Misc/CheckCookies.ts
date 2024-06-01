
export { middleware as checkCookies }

import { BaseState } from '../State.ts'
import { Context } from 'Oak'


async function middleware (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    if( context.request.url.searchParams.has('CheckCookie') ){

        if( await context.cookies.size ){
            const url = context.request.url
            url.searchParams.delete('NoCookie')
            url.searchParams.delete('CheckCookie')
            context.response.redirect(url)
            return
        }

        const url = context.request.url
        url.searchParams.delete('CheckCookie')
        url.searchParams.set('NoCookie','')
        context.response.redirect(url)
        return
    }

    return await next()
}
