
export { middleware as routeReactDrag }

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

    const asset = reactions.get(reactionId)

    const css = `
        [ value = '${ reactionId }' ]::before {
            list-style-image : url('/API/Chat/Message/React/Drop?reaction=${ reactionId }&a=${ Date.now() }') ;
        }
    `

    frame.write(`<style>${ css }</style>`)

    console.log(`Started dragging reaction`,reactionId,reactions.get(reactionId))

    context.response.status = 200
}
