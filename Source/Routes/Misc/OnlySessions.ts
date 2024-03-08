
export { onlySessions }

import { SessionState } from '../State.ts'
import { Context } from 'Oak'


function onlySessions < State extends SessionState > (
    context : Context<State> ,
    next : () => Promise<any>
){

    if( context.state.hasSession )
        return next()

    context.response.status = 403
}
