
export { Messages }

import { Message , Session } from '../../../../../Misc/Types.ts'
import { Icon, Reactions } from '../../../../../Reactions/Groups.ts'
import { reactions } from 'State'
import { userById } from 'Database'
import { UTF8Meta } from 'UI/Parts'
import moment from 'Moment'
import { BaseDocument } from "Framework";


interface Props {
    messages : Array<Message>
    session : Session
}


async function Messages ( props : Props ){

    const { messages , session } = props

    const elements = await Promise.all(messages.map(( message ) => renderMessage(message,session)))

    const selected = ( session.selectedMessage )
        ? session.sessionIds.indexOf(session.selectedMessage) : 0

    return (

        <BaseDocument
            name = 'Messages'
        >

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

            <style dangerouslySetInnerHTML = {{ __html : `
                :root { --Selected_Message : ${ selected } ; }
            ` }} />

        </BaseDocument>
    )
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
                    style = { `----Message_Index : ${ number }` }
                    class = 'Message'
                >

                    <p> { name } : { message.message } </p>

                    <span children = { local } />

                    { ( emotes ) && <>

                        <div class = 'Emotes' >

                            { emotes
                                .filter(( reaction ) => reaction.count )
                                .map(( reaction ) => [ Reactions.get(reaction.emoteId) , reaction.count ] as const )
                                .filter(( value ) : value is [ Icon , number ] => !! value[0] )
                                .map(([ reaction , count ]) => {

                                    return <>

                                        <div class = 'Emote'>

                                            <img src = { `/${ reaction.file }` } />

                                            <span children = { count } />

                                        </div>
                                    </>
                                })}

                        </div>

                    </> }

                    <div class = 'Options' >

                        <div
                            data-option = 'React'
                            children = { 'R' }
                        />

                    </div>

                    <style dangerouslySetInnerHTML = {{ __html : `

                        [ data-option = React ]:active {
                            list-style-image : url('/API/Spark?Scope=Message:Option&Action=Click&Option=React&Message=${ message.messageId }&Time=${ Date.now() }') ;
                        }

                    ` }} />

                </div>
            </form>
        </label>
    </>
}


async function nick ( userId : string ){
    return await userById(userId)
        .then(( user ) => user.value?.nick )
}
