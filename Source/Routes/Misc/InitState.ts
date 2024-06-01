
export { middleware as initState }

import { BaseState } from '../State.ts'
import { Context } from 'Oak'


function middleware (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    context.state = {
        hasCookies : 'Unknown' ,
        hasSession : false
    }

    return next()
}
