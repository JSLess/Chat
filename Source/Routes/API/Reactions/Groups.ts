
export { middleware as handleGroups }

import { WithSession } from '../../State.ts'
import { Context } from 'Oak'



async function middleware (
    context : Context<WithSession>
){

    const form = await context.request.body({ type : 'form' }).value

    const groupId = form.get('Group')!

    console.debug(`Groups Action`,groupId)


    const url = `/Frame/Chat/Reactions/Emoticons?Group=${ groupId }`

    const frame = context.state.session.frames.reactions_emoticons

    frame?.redirect(url)

    frame?.close()

    context.response.status = 200
}
