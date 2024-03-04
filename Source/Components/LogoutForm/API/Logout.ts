
export type { Credentials }
export { middleware as routeAPI }

import { BaseState } from '../../../Routes/State.ts'
import { sessions } from 'State'
import { Context } from 'Oak'
import { delay } from 'Async'


interface Credentials {
    accountId : string
}


async function middleware (
    context : Context<BaseState>
){

    const before = Date.now()

    if( context.state.hasSession )
        sessions.delete(context.state.sessionId)

    const after = Date.now()

    const remaining = 100 - ( after - before )

    await delay(remaining)


    await context.cookies.delete('Session')

    context.response.redirect('/')
}
