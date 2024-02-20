
export { middleware as routeReactHover }

import { messages , reactions, sessions } from 'State'
import { Context } from 'Oak'
import { redraw } from 'Render'
import { WithSession } from "../../../../State.ts";



async function middleware (
    context : Context<WithSession>
){

    const { session } = context.state

    session.contexts.reactions ??= new Map
    session.contexts.reactions.set('Hovered','Category')

    const frame = session.frames.reactions

    if( ! frame )
        return


    const css = `
        .Category::before {
            list-style-image : url('/API/Chat/Message/React/Unhover?a=${ Date.now() }') ;
        }
    `

    frame.write(`<style>${ css }</style>`)

    console.log(`Started hovering category`)

    context.response.status = 200
}
