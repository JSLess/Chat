
export { routePostMessage }

import { messages , sessions } from '../../State.ts'
import { WithSession } from '../Session.ts'
import { Context } from 'Oak'
import { redraw } from '../../App.ts'
import { render } from 'Render'
import { Input } from '../../Frames/Input.tsx'


const Message_Maximum_Length = 500


async function routePostMessage (
    context : Context<WithSession>
){

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
        .get(context.state.sessionId)!

    const accountId = session.accountId!


    const messageId = crypto
        .randomUUID()

    messages.set(messageId,{
        messageId : messageId ,
        accountId : accountId ,
        time : new Date ,
        message : message
    })

    session.selectedMessage ??= messageId

    context.response.body = `
        <!DOCTYPE html>
        <html>
            <head>
                <link
                    href = '/Assets/Input.css'
                    rel = stylesheet
                />
            </head>
            <body>
                ${ render(Input()) }
            </body>
        </html>
    `

    redraw()
}
