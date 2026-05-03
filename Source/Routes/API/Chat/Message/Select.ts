
export { middleware as routeSelectMessage }

import { messages , sessions } from 'State'
import { Context } from 'Oak'
import { SetVar } from 'Framework'
import { Status } from 'Misc'
import { z } from 'Zod'


const SelectForm = z.object({
    messageId : z.string().uuid()
})


type SelectForm = z.infer<typeof SelectForm>


const Template_Selected_Message = ( messageIndex : number ) =>
    `<style> :root { ${ SetVar('Selected_Message',messageIndex) } </style>`



async function middleware (
    context : Context
){

    const params = await context.request.body.form()

    const data = {
        messageId : params.get('MessageId')
    }

    const form = SelectForm.parse(data)

    const messageId = form.messageId

    if( messages.has(messageId) ){

        const { sessionId } = context.state

        const session = sessions.get(sessionId)!
        const index = session.sessionIds.indexOf(messageId)
        const html = Template_Selected_Message(index)

        session.selectedMessage = messageId
        session.frames.messages?.write(html)
    }

    context.response.status = Status.OK
}
