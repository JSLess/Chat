
export { middleware as determineCookies }

import { BaseState } from '../State.ts'
import { Context } from 'Oak'


async function middleware (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    if( context.state.hasSession )
        context.state.hasCookies = 'Enabled'

    if( context.request.url.searchParams.has('NoCookies') )
        context.state.hasCookies = 'Disabled'

    if( await context.cookies.size )
        context.state.hasCookies = 'Enabled'

    return await next()
}
