
export { Component as Message }

import { Message , Session } from '../../../../../Misc/Types.ts'
import { Icon, Reactions } from '../../../../../Reactions/Groups.ts'
import { toAgoString } from 'Misc/Time'
import { reactions } from 'State'
import { userById } from 'Database'
import { Emote } from './Emote.tsx'


interface Props {
    message : Message ,
    session : Session
}


async function Component (
    props : Props
){

    const { message , session } = props

    const { messageId , time } = message

    const local = toAgoString(time)


    const name = await nick(message.userId)

    const emotes = reactions
        .get(messageId)

    const elements = ( emotes ?? [] )
        .filter(( reaction ) => reaction.count )
        .map(( reaction ) => [ Reactions.get(reaction.emoteId) , reaction.count ] as const )
        .filter(( value ) : value is [ Icon , number ] => !! value[0] )
        .map(([ reaction , count ]) => (
            <Emote
                count = { count }
                icon = { reaction }
            />
        ))


    if( ! session.sessionIds.includes(messageId) )
        session.sessionIds.push(messageId)

    const number = session.sessionIds.indexOf(messageId)


    return <>

        <input
            value = { message.messageId }
            type = 'submit'
            name = 'MessageId'
            id = { `Submit-${ messageId }` }
        />

        <label
            for = { `Submit-${ messageId }` }
        >

            <form
                action = '/Chat/React'
                target = 'void'
                method = 'post'
            >

                <div
                    data-message = { messageId }
                    style = { `----Message_Index : ${ number }` }
                    class = 'Message'
                >

                    <p> { name } : { message.message } </p>

                    <span children = { local } />

                    { ( !! elements.length ) && (

                        <div
                            children = { elements }
                            class = 'Emotes'
                        />

                    ) }

                    <div class = 'Options' >

                        <div
                            data-option = 'React'
                            children = { 'R' }
                        />

                    </div>

                    <style dangerouslySetInnerHTML = {{ __html : `

                        [ data-option = React ]:active {
                            list-style-image : url('/API/Spark?Scope=Message:Option&Action=Click&Option=React&Message=${ messageId }&Time=${ Date.now() }') ;
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
        .then(( nick ) => nick ?? 'Anon' )
}
