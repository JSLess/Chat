
export { routeSend }

import { BaseState, WithSession } from 'Routes'
import { newMessage, sessions } from 'State'
import { render , redraw } from 'Render'
import { InputFrame } from '../Component/Input.tsx'
import { Context } from 'Oak'
import { Status } from 'Misc'


const Message_Maximum_Length = 500


async function routeSend
< State extends BaseState > (
    context : Context<State>
){

    const { response } = context

    const state = context.state as WithSession

    const form = await context.request.body.formData()

    const content = form.get('message')?.toString()

    if( ! content ){

        response.status = Status.NotAcceptable
        response.body = JSON
            .stringify({
                problem : `No message has been given.`
            })

        return
    }

    if( content.length > Message_Maximum_Length ){

        response.status = Status.NotAcceptable
        response.body = JSON
            .stringify({
                problem : `Messages cannot be longer than ${ Message_Maximum_Length } characters`
            })

        return
    }

    const session = sessions
        .get(state.sessionId)!

    const userId = session.userId!

    const message = newMessage(userId,content)


    session.selectedMessage ??= message.messageId

    response.body = render(InputFrame())

    redraw()
}
