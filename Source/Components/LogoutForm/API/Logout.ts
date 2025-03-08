
export type { Credentials }
export { routeAPI }

import { startTimer , Cookies , Pages } from 'Misc'
import { BaseState } from 'Routes/State'
import { sessions } from 'State'
import { Context } from 'Oak'


interface Credentials {
    accountId : string
}


async function routeAPI (
    context : Context<BaseState>
){

    const { response , cookies , state } = context

    const timer = startTimer(100)

    if( state.hasSession )
        sessions.delete(state.sessionId)

    timer.waitRemaining()


    await cookies.delete(Cookies.Session)

    response.redirect(Pages.Home)
}
