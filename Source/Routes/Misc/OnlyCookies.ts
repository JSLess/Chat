
export { onlyWithCookies }

import { CookieState } from 'Routes/State'
import { Context } from 'Oak'
import { Status } from 'Misc'


function onlyWithCookies 
< State extends CookieState > (
    context : Context<State> ,
    next : () => Promise<any>
){

    const { response , state } = context

    if( state.hasCookies === 'Enabled' )
        return next()

    response.status = Status.Forbidden
}
