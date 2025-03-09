
export { handleHeader }

import { WithSession } from 'Routes/State'
import { Context } from 'Oak'
import { Status } from 'Misc'


async function handleHeader (
    context : Context<WithSession>
){

    const { response , state } = context

    console.debug(`Header Action`)

    state.session.frames.reactions_window?.refresh()

    response.status = Status.OK
}
