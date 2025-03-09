
export { determineCookies }

import { BaseState } from 'Routes/State'
import { Context } from 'Oak'


async function determineCookies (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    const { cookies , request , state } = context

    if( state.hasSession )
        state.hasCookies = 'Enabled'

    if( request.url.searchParams.has('NoCookies') )
        state.hasCookies = 'Disabled'

    if( await cookies.size )
        state.hasCookies = 'Enabled'

    return await next()
}
