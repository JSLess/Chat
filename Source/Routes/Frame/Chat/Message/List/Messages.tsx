
export { renderMessages }

import { messages , reactions } from 'State'
import { Message , Session } from '../../../../../Misc/Types.ts'
import { Reactions } from 'Dummy'
import { userById } from 'Database'
import { render } from 'Render'
import moment from 'npm:moment@2.30.1'



async function renderMessages ( session : Session ){

    const msgs = [ ... messages.values() ].reverse()

    let html = render( await Messages({ messages : msgs , session }) )

    const selected = ( session.selectedMessage )
        ? session.sessionIds.indexOf(session.selectedMessage) : 0

    html += `<style> :root { --Selected_Message : ${ selected } ; } </style>`

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
            <meta
                content = 'light dark'
                name = 'color-scheme'
            />
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


function formatDelta (
    time : Date
){

    const duration = moment.duration(moment().diff(time))

    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    if( years > 0 )
        return `${ years }y`

    if( months > 0 )
        return `${ months }M`

    if( days > 0 )
        return `${ days }d`

    if( hours > 0 )
        return `${ hours }h`

    if( minutes > 0 )
        return `${minutes}m`

    return `Now`
}


async function renderMessage ( message : Message , session : Session ){

    const { time } = message

    const local = formatDelta(time)


    const name =
        await nick(message.userId) ??
        'Anon'

    const emotes = reactions
        .get(message.messageId)

    // sqrt / pow : 117
    // abs : 118

    if( ! session.sessionIds.includes(message.messageId) )
        session.sessionIds.push(message.messageId)

    const number = session.sessionIds.indexOf(message.messageId)

    return <>

        <input
            type = 'submit'
            id = { `Submit-${ message.messageId }` }
            name = 'MessageId'
            value = { message.messageId }
        />

        <label
            for = { `Submit-${ message.messageId }` }
        >

            <form
                action = '/Chat/React'
                target = 'void'
                method = 'post'
            >

                <div
                    data-message = { message.messageId }
                    class = 'Message'
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

                    <p> { name } : { message.message } </p>

                    <span children = { local } />

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
    return await userById(userId)
        .then(( user ) => user.value?.nick )
}
