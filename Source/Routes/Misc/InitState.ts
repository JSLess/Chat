
export { initState }

import { BaseState } from 'Routes/State'
import { Context } from 'Oak'


function initState (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    context.state = {
        hasCookies : 'Unknown' ,
        hasSession : false
    }

    return next()
}
