
export { recheckCookies }

import { in10Seconds } from 'Misc'
import { BaseState } from 'Routes/State'
import { setCookie } from 'HTTP'
import { Context } from 'Oak'


function recheckCookies (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    const { response , request , state } = context

    if( state.hasCookies === 'Unknown' ){

        setCookie(response.headers,{
            sameSite : 'Lax' ,
            httpOnly : true ,
            expires : in10Seconds() ,
            secure : false ,
            value : 'Dummy' ,
            name : 'CheckCookie' ,
            path : '/'
        })

        const url = request.url
        url.searchParams.set('CheckCookie','')
        
        response.redirect(url)

        return
    }

    return next()
}
