
export { middleware as routeSend }

import { messages , sessions } from 'State'
import { render , redraw } from 'Render'
import { Context } from 'Oak'
import { BaseState, WithSession } from "../../../Routes/State.ts";
import { Input } from "../Component/Input.tsx";


const Message_Maximum_Length = 500


async function middleware < State extends BaseState > (
    context : Context<State>
){

    const state = context.state as WithSession

    const form = await context.request.body({ type : 'form-data' }).value.read()

    const { fields } = form

    const message = fields.message

    if( ! message ){

        context.response.status = 400
        context.response.body = JSON
            .stringify({
                problem : `The message field is missing`
            })

        return
    }

    if( message.length > Message_Maximum_Length ){

        context.response.status = 400
        context.response.body = JSON
            .stringify({
                problem : `Messages cannot be longer than ${ Message_Maximum_Length } characters`
            })

        return
    }

    const session = sessions
        .get(state.sessionId)!

    const userId = session.userId!


    const messageId = crypto
        .randomUUID()

    messages.set(messageId,{
        messageId : messageId ,
        userId : userId ,
        time : new Date ,
        message : message
    })

    session.selectedMessage ??= messageId

    context.response.body = render(Input())


    redraw()
}
