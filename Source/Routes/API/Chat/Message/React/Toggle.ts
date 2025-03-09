
export { routeReactToggle }

import { messages , reactions , sessions } from 'State'
import { Context } from 'Oak'
import { redraw } from 'Render'
import { Status } from 'Misc'
import { z } from 'Zod'


const ReactToggleForm = z.object({
    emote : z.string().uuid()
})


async function routeReactToggle (
    context : Context
){

    const params = await context.request.body.form()

    const data = {
        emote : params.get('Emote')
    }

    const form = ReactToggleForm.safeParse(data)

    if( ! form.success ){
        console.error(form.error)
        context.response.status = Status.BadRequest
        return
    }

    const emoteId = form.data.emote

    const session = sessions.get(context.state.sessionId)!

    const { selectedMessage } = session

    const userId = session.userId!

    if( selectedMessage ){

        const message = messages
            .get(selectedMessage)

        if( message ){

            if( ! reactions.has(message.messageId) )
                reactions.set(message.messageId,[])

            const reacts = reactions
                .get(message.messageId)!

            const react = reacts.find(( react ) => 
                react.emoteId === emoteId )

            if( ! react )
                reacts.push({
                    emoteId : emoteId ,
                    users : new Set([ userId ]) ,
                    count : 1
                })
            else {

                if( react.users.has(userId) ){
                    react.count--
                    react.users.delete(userId)
                } else {
                    react.count++
                    react.users.add(userId)
                }
            }

            redraw()
        }
    }

    context.response.status = Status.OK
}
