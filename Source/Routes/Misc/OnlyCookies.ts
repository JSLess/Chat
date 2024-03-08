
export { onlyWithCookies }

import { CookieState } from '../State.ts'
import { Context } from 'Oak'


function onlyWithCookies < State extends CookieState > (
    context : Context<State> ,
    next : () => Promise<any>
){

    if( context.state.hasCookies === 'Enabled' )
        return next()

    context.response.status = 403
}
