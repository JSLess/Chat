
export { renderMessages }

import { Account , Message , Session, User } from '../Types.ts'
import { Reactions , database } from '../App.ts'
import { messages, reactions } from '../State.ts'
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

        <link
            href = '/Assets/Messages.css'
            rel = 'stylesheet'
        />

        <form
             action = '/Chat/Select'
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
        await handle(message.accountId) ??
        '???'

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
                style = { `border-color:rgba(255,255,255,calc(1 - max(var(--Selected_Message) - ${ number },-1 * ( var(--Selected_Message) - ${ number } ) )))` }
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

                                        <img src = { `/Assets/Emote/${ asset }.png` } />

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


async function nick ( accountId : string ){
    return await database
        .get<User>([ 'User_By_Id' , accountId ])
        .then(( user ) => user.value?.nick )
}


async function handle ( accountId : string ){
    return await database
        .get<Account>([ 'Account_By_Id' , accountId ])
        .then(( account ) => account.value?.handle )
}
