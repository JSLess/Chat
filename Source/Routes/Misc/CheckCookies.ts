
export { checkCookies }

import { BaseState } from 'Routes/State'
import { Context } from 'Oak'


async function checkCookies (
    context : Context<BaseState> ,
    next : () => Promise<any>
){
    
    const { response , request , cookies } = context

    const url = new URL(request.url)

    const search = url.searchParams

    if( search.has('CheckCookie') ){

        if( await cookies.size ){
            
            search.delete('NoCookie')
            search.delete('CheckCookie')
            
            response.redirect(url)
            
            return
        }

        search.delete('CheckCookie')
        search.set('NoCookie','')

        response.redirect(url)
        
        return
    }

    return await next()
}
