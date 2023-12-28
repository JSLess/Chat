
export { routeMessages }

import { renderMessages } from '../../Frames/Messages.tsx'
import { AsyncResponse } from '../../AsyncResponse.ts'
import { WithSession } from '../Session.ts'
import { sessions } from '../../State.ts'
import { Context } from 'Oak'


async function routeMessages (
    context : Context<WithSession>
){

    const { response , state } = context

    const session = sessions
        .get(state.sessionId)!

    const { headers } = response

    headers.set('Content-Type','text/html;charset=utf-8')
    headers.set('Transfer-Encoding','chunked')
    headers.set('Connection','keep-alive')
    headers.set('Keep-Alive',`timeout=${ 60 * 60 }`)

    session.messages = new AsyncResponse

    response.body = session.messages.readable
    session.messages.write(await renderMessages(session))
}
