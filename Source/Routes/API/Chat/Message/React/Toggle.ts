
export { middleware as routeReactToggle }

import { messages , reactions, sessions } from 'State'
import { Context } from 'Oak'
import { redraw } from 'Render'
import { z } from 'Zod'


const ReactToggleForm = z.object({
    emote : z.string().uuid()
})


async function middleware (
    context : Context
){

    const body = await context.request.body().value

    const params = ( body as URLSearchParams )

    const data = {
        emote : params.get('Emote')
    }

    const form = ReactToggleForm.safeParse(data)

    if( ! form.success ){
        console.error(form.error)
        context.response.status = 400
        return
    }

    const emoteId = form.data.emote

    console.log('React',emoteId)

    const session = sessions.get(context.state.sessionId)!

    const { selectedMessage } = session

    const accountId = session.accountId!

    if( selectedMessage ){

        const message = messages.get(selectedMessage)

        if( message ){

            if( ! reactions.has(message.messageId) )
                reactions.set(message.messageId,[])

            const reacts = reactions.get(message.messageId)!

            const react = reacts.find(( react ) => react.emoteId === emoteId )

            if( ! react )
                reacts.push({
                    count : 1 ,
                    emoteId ,
                    users : new Set([ accountId ])
                })
            else {

                if( react.users.has(accountId) ){
                    react.count--
                    react.users.delete(accountId)
                } else {
                    react.count++
                    react.users.add(accountId)
                }
            }

            redraw()
        }
    }

    context.response.status = 200
}
