

export { middleware as handleSparks }

import { messages , reactions, sessions } from 'State'
import { Context } from 'Oak'
import { redraw } from 'Render'
import { WithSession } from "../../State.ts";



async function middleware (
    context : Context<WithSession>
){

    const { session } = context.state

    const frame = session.frames.reactions

    const search = context.request.url.searchParams

    const action = search.get('Action')
    const scope = search.get('Scope')

    if( ! action || ! scope ){
        context.response.status = 400
        return
    }

    console.log('SCop[e',scope,action)

    switch ( scope ){
    case 'Reactions:Editing' :

        switch ( action ){
            case 'Hover' : {

                const { contexts } = session

                contexts.reactions ??= new Map
                contexts.reactions.set('Hovered','Category')

                frame?.write(`
                    <style>
                        .Category::before {
                            list-style-image : url('/API/Spark?Scope=Reactions:Editing&Action=Unhover&Time=${ Date.now() }') ;
                        }
                    </style>
                `)

                break
            }
            case 'Unhover' : {

                const { contexts } = session

                if( contexts.reactions )
                    contexts.reactions.delete('Hovered')

                frame?.write(`
                    <style>
                        .Category:hover::before {
                            list-style-image : url('/API/Spark?Scope=Reactions:Editing&Action=Hover&Time=${ Date.now() }') ;
                        }
                    </style>
                `)

                break
            }
            case 'Drag' : {

                const reactionId = search.get('Reaction')

                frame?.write(`
                    <style>
                        [ value = '${ reactionId }' ]::before {
                            list-style-image : url('/API/Spark?Scope=Reactions:Editing&Action=Drop&Reaction=${ reactionId }&Time=${ Date.now() }') ;
                        }
                    </style>
                `)

                break
            }
            case 'Drop' : {

                const reactionId = search.get('Reaction')

                frame?.write(`
                    <style>
                        [ value = '${ reactionId }' ]:active::before {
                            list-style-image : url('/API/Spark?Scope=Reactions:Editing&Action=Drag&Reaction=${ reactionId }&Time=${ Date.now() }') ;
                        }
                    </style>
                `)

                const hovered = session.contexts.reactions?.get('Hovered')

                if( hovered )
                    frame?.write(`<p> Dropped emote ${ reactionId } on ${ hovered }</p>`)

                break
            }
        }

        break
    }


    context.response.status = 200
}
