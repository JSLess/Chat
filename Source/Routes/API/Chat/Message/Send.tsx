
export { middleware as routeSendMessage }

import { messages , sessions } from 'State'
import { render , redraw } from 'Render'
import { UTF8Meta } from 'UI/Parts'
import { Context } from 'Oak'
import { Input } from "../../../Frame/Chat/Message/Input/Input.tsx";
import { WithSession } from "../../../State.ts";


const Message_Maximum_Length = 500


async function middleware (
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

    context.response.body = render(Component())


    redraw()
}


function Component (){
    return <>
        <html>
            <head>

                <UTF8Meta />

                <link
                    href = '/Asset/Input.css'
                    rel = 'stylesheet'
                />
            </head>
            <body>
                <Input />
            </body>
        </html>
    </>
}
