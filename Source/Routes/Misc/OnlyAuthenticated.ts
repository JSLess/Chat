
export { middleware as onlyAuthenticated }

import { BaseState } from '../State.ts'
import { Context } from 'Oak'


async function middleware < State extends BaseState > (
    context : Context<State> ,
    next : () => Promise<any>
){

    const { response , state } = context

    if( state.hasSession )
        return await next()

    response.status = 403

    response.body = JSON.stringify({
        problem : `You must be logged in to use this feature`
    })
}

