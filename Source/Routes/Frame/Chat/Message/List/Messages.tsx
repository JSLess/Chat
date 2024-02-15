
export { renderMessages }

import { messages , reactions , database } from 'State'
import { Message , Session, User } from '../../../../../Misc/Types.ts'
import { Reactions } from 'Dummy'
import { render } from 'Render'



async function renderMessages ( session : Session ){

    const msgs = [ ... messages.values() ]

    let html = render( await Messages({ messages : msgs , session }) )

    html += `<style> :root { --Selected_Message : ${ ( session.selectedMessage ) ? session.sessionIds.indexOf(session.selectedMessage) : 0 } ; } </style>`

    return html
}


interface Props {
    messages : Array<Message>
    session : Session
}

async function Messages ( props : Props ){

    const { messages , session } = props

    const elements = await Promise.all(messages.map(( message ) => renderMessage(message,session)))

    return <>

        <head>
            <meta name="color-scheme" content="light dark" />
        </head>

        <link
            href = '/Asset/Messages.css'
            rel = 'stylesheet'
        />

        <form
             action = '/API/Chat/Message/Select'
             target = 'void'
             method = 'post'
        >

        <div
            children = { elements }
            class = 'Messages'
        />

        </form>

        <iframe name = 'void' />
    </>
}




async function renderMessage ( message : Message , session : Session ){

    const { time } = message

    const local = time
        .toLocaleTimeString(undefined,{ timeStyle : 'short' })


    const name =
        await nick(message.accountId) ??
        'Anon'

    const emotes = reactions
        .get(message.messageId)

    // sqrt / pow : 117
    // abs : 118

    if( ! session.sessionIds.includes(message.messageId) )
        session.sessionIds.push(message.messageId)

    const number = session.sessionIds.indexOf(message.messageId)

    return <>

        <input type = 'submit'  id = { `Submit-${ message.messageId }` } name = 'MessageId' value = { message.messageId }  />

        <label for = { `Submit-${ message.messageId }` } >

        <form
             action = '/Chat/React'
             target = 'void'
             method = 'post'
        >

            <div class = 'Message' data-message = { message.messageId }
                style = { `
                    ----Delta : var( --Selected_Message ) - ${ number } ;
                    ----Abs : max( var( ----Delta ) , -1 * var( ----Delta ) ) ;
                    ----Norm : var( ----Abs ) / var( ----Abs ) ;

                    border-color :
                        color-mix( in srgb ,
                            var( ---Selected )
                            calc( 100% * ( 1 - var( ----Norm ) ) ) ,
                            var( ---Unselected )
                            calc( 100% * var( ----Norm ) )
                        ) ;
                ` }
            >

                <p> { local } : { name } : { message.message } </p>

                { ( emotes ) && <>

                    <div class = 'Emotes' >

                        { emotes
                            .filter(( reaction ) => reaction.count )
                            .map(( reaction ) => [ Reactions.get(reaction.emoteId) , reaction.count])
                            .map(([ asset , count ]) => {

                                return <>

                                    <div class = 'Emote'>

                                        <img src = { `/Asset/Emote/${ asset }.png` } />

                                        <span children = { count } />

                                    </div>
                                </>
                            })}

                    </div>

                </> }


            </div>


        </form>

        </label>

    </>
}


async function nick ( userId : string ){
    return await database
        .get<User>([ 'User_By_Id' , userId ])
        .then(( user ) => user.value?.nick )
}
