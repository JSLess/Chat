
export { onlySessions }

import { SessionState } from 'Routes/State'
import { Context } from 'Oak'
import { Status } from 'Misc'


function onlySessions 
< State extends SessionState > (
    context : Context<State> ,
    next : () => Promise<any>
){

    const { response , state } = context

    if( state.hasSession )
        return next()

    response.status = Status.Forbidden
}
