
export { middleware as recheckCookies }

import { BaseState } from '../State.ts'
import { setCookie } from 'HTTP'
import { Context } from 'Oak'


function middleware (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    if( context.state.hasCookies === 'Unknown' ){

        setCookie(context.response.headers,{
            sameSite : 'Lax' ,
            httpOnly : true ,
            expires : new Date(Date.now() + 1000 * 10) ,
            secure : false ,
            value : 'Dummy' ,
            name : 'CheckCookie' ,
            path : '/'
        })

        const url = context.request.url
        url.searchParams.set('CheckCookie','')
        
        context.response.redirect(url)

        return
    }

    return next()
}
