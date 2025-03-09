
export { determineSession }

import { BaseState } from 'Routes/State'
import { sessions } from 'State'
import { Context } from 'Oak'


async function determineSession (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    const { cookies , state } = context

    const sessionId = await cookies.get('Session')

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
        ... state ,
        hasSession : true ,
        sessionId : sessionId ,
        session : session
    }

    return await next()
}
