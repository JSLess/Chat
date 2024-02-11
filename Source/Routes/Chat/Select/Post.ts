
export { routeChatSelect }

import { messages , sessions } from '../../../State.ts'
import { Context } from 'Oak'
import { z } from 'Zod'


const SelectForm = z.object({
    messageId : z.string().uuid()
})


type SelectForm = z.infer<typeof SelectForm>


const Template_Selected_Message = ( messageIndex : number ) =>
    `<style> :root { --Selected_Message : ${ messageIndex } ; } </style>`



async function routeChatSelect ( context : Context ){

    const body = await context.request.body().value

    const params = ( body as URLSearchParams )

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
        session.messages?.write(html)
    }

    context.response.status = 200
}
