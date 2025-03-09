

export { handleSparks }

import { messages , reactions } from 'State'
import { WithSession } from 'Routes/State'
import { Context } from 'Oak'
import { redraw } from 'Render'
import { Status } from 'Misc'


async function handleSparks (
    context : Context<WithSession>
){

    const { response , request , state } = context

    const { session } = state

    const search = request.url.searchParams

    const action = search.get('Action')
    const scope = search.get('Scope')

    if( ! action || ! scope ){
        response.status = Status.BadRequest
        return
    }

    switch ( scope ){

        case 'General:Overlay' : {

            const frame = session.frames.home

            switch ( action ){

                case 'Click' : {

                    frame?.write(`
                        <style>
                            #Overlay {
                                display : none ;
                            }
                            #Overlay:active {
                                list-style-image : url('/API/Spark?Scope=General:Overlay&Action=Click&Time=${ Date.now() }') ;
                            }
                        </style>
                    `)

                    frame?.write(`
                        <style>
                            #Reactions_Window {
                                display : none ;
                            }
                        </style>
                    `)
                }
            }

            break
        }

        case 'Reactions:Use' : {

            const frame = session.frames.reactions_emoticons

            const reactionId = search.get('Reaction')!

            switch ( action ){
                case 'Click' : {

                    const { selectedMessage } = context.state.session

                    const userId = session.userId!

                    if( selectedMessage ){

                        const message = messages.get(selectedMessage)

                        if( message ){

                            if( ! reactions.has(message.messageId) )
                                reactions.set(message.messageId,[])

                            const reacts = reactions.get(message.messageId)!

                            const react = reacts.find(( react ) => 
                                react.emoteId === reactionId )


                            if( ! react )
                                reacts.push({
                                    count : 1 ,
                                    emoteId : reactionId ,
                                    users : new Set([ userId ])
                                })
                            else {

                                if( react.users.has(userId) ){
                                    react.count--
                                    react.users.delete(userId)
                                } else {
                                    react.count++
                                    react.users.add(userId)
                                }
                            }

                            redraw()
                        }
                    }

                    frame?.write(`
                        <style>
                            [ data-reaction = '${ reactionId }' ]:not(:active) {
                                list-style-image : url('/API/Spark?Scope=Reactions:Use&Action=Unclick&Reaction=${ reactionId }&Time=${ Date.now() }') ;
                            }
                        </style>
                    `)

                    break
                }
                case 'Unclick' : {

                    frame?.write(`
                        <style>
                            [ data-reaction = '${ reactionId }' ]:active {
                                list-style-image : url('/API/Spark?Scope=Reactions:Use&Action=Click&Reaction=${ reactionId }&Time=${ Date.now() }') ;
                            }
                        </style>
                    `)

                    break
                }
            }

            break
        }

        case 'Message:Option' : {

            const frame = session.frames.messages

            const messageId = search.get('Message')!
            const option = search.get('Option')!

            switch ( action ){
                case 'Click' : {

                    switch ( option ){
                    case 'React' :

                        session.frames.home?.write(`
                            <style>
                                #Overlay {
                                    display : block ;
                                }
                                #Reactions_Window {
                                    display : block ;
                                }
                            </style>
                        `)

                        break
                    }


                    frame?.write(`
                        <style>
                            [ data-option = ${ option } ] {
                                list-style-image : url('/API/Spark?Scope=Message:Option&Action=Unclick&Option=${ option }&Message=${ messageId }&Time=${ Date.now() }') ;
                            }
                        </style>
                    `)

                    break
                }
                case 'Unclick' : {

                    frame?.write(`
                        <style>
                            [ data-option = ${ option } ]:active {
                                list-style-image : url('/API/Spark?Scope=Message:Option&Action=Click&Option=${ option }&Message=${ messageId }&Time=${ Date.now() }') ;
                            }
                        </style>
                    `)

                    break
                }
            }

            break
        }
    }

    response.status = Status.OK
}
