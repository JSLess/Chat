
export { handleGroups }

import { WithSession } from '../../State.ts'
import { Context } from 'Oak'
import { Status } from 'Misc'


async function handleGroups (
    context : Context<WithSession>
){

    const { response , request , state } = context

    const form = await request.body.formData()

    const groupId = form.get('Group')!

    console.debug(`Groups Action`,groupId)


    const url = `/Frame/Chat/Reactions/Emoticons?Group=${ groupId }`

    const frame = state.session.frames.reactions_emoticons

    frame?.redirect(url)

    frame?.close()

    response.status = Status.OK
}
