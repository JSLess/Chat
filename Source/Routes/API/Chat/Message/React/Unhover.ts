
export { middleware as routeReactUnhover }

import { messages , reactions, sessions } from 'State'
import { Context } from 'Oak'
import { redraw } from 'Render'
import { WithSession } from "../../../../State.ts";



async function middleware (
    context : Context<WithSession>
){

    const { session } = context.state

    if( session.contexts.reactions )
        session.contexts.reactions.delete('Hovered')

    const frame = session.frames.reactions

    if( ! frame )
        return

    const css = `
        .Category:hover::before {
            list-style-image : url('/API/Chat/Message/React/Hover?a=${ Date.now() }') ;
        }
    `

    frame.write(`<style>${ css }</style>`)


    console.log(`Stopped dragging .Category`)

    context.response.status = 200
}
