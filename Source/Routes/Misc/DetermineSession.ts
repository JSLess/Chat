
export { middleware as determineSession }

import { BaseState } from '../State.ts'
import { sessions } from 'State'
import { Context } from 'Oak'


async function middleware (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    const sessionId = await context.cookies.get('Session')

    if( ! sessionId )
        return await next()

    /*
     * No need to check if it's a proper UUID
     * only if it contains valid chars.
     */

    if( ! /^[-0-9A-F]{36}$/i.test(sessionId) )
        return await next()

    const session = sessions.get(sessionId)

    if( ! session )
        return await next()

    context.state = {
        ... context.state ,
        hasSession : true ,
        sessionId : sessionId ,
        session : session
    }

    return await next()
}
