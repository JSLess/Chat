
export { middleware as handleHeader }

import { WithSession } from '../../State.ts'
import { Context } from 'Oak'



async function middleware (
    context : Context<WithSession>
){
    console.debug(`Header Action`)

    context.state.session.frames.reactions_window?.write(`
        <meta
            http-equiv = refresh
            content = 0
        />
    `)

    context.response.status = 200
}
