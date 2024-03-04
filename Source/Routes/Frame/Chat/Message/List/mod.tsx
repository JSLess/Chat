
export { middleware as routeMessages }

import { DynamicFrame } from 'Framework'
import { WithSession } from '../../../../State.ts'
import { Messages } from './Messages.tsx'
import { sessions } from 'State'
import { messages } from 'State'
import { Context } from 'Oak'


async function middleware (
    context : Context<WithSession>
){

    const session = sessions
        .get(context.state.sessionId)!

    const msgs = [ ... messages.values() ].reverse()

    const children = await Messages({
        messages : msgs , session
    })

    DynamicFrame({
        children , context ,
        frameId : 'messages'
    })
}
