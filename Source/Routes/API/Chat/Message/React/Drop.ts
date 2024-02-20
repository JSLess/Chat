
export { middleware as routeReactDrop }

import { messages , reactions, sessions } from 'State'
import { Context } from 'Oak'
import { redraw } from 'Render'
import { WithSession } from "../../../../State.ts";



async function middleware (
    context : Context<WithSession>
){

    const reactionId = context.request.url.searchParams.get('reaction')

    if( ! reactionId ){
        context.response.status = 404
        return
    }

    const { session } = context.state

    const frame = session.frames.reactions

    if( ! frame )
        return

    const css = `
        [ value = '${ reactionId }' ]:active::before {
            list-style-image : url('/API/Chat/Message/React/Drag?reaction=${ reactionId }&a=${ Date.now() }') ;
        }
    `

    let html = `<style>${ css }</style>`

    const hovered = session.contexts.reactions?.get('Hovered')

    if( hovered )
        html += `<p> Dropped emote ${ reactionId } on ${ hovered }</p>`

    frame.write(html)


    console.log(`Stopped dragging reaction`,reactionId,reactions.get(reactionId))

    context.response.status = 200
}
