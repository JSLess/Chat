
export { Component as Message }

import { Reactions , IconType } from '../../../../../Reactions/Groups.ts'
import { Message , Session } from 'Misc/Types'
import { apiUrl , CSS } from 'Misc'
import { toAgoString } from 'Misc/Time'
import { reactions } from 'State'
import { userById } from 'Database'
import { Emote } from './Emote.tsx'
import { Icon } from 'UI/Parts'


interface MessageArgs {
    message : Message ,
    session : Session
}


async function Component (
    args : MessageArgs
){

    const { message , session } = args

    const { messageId , time } = message

    const local = toAgoString(time)


    const name = await nick(message.userId)

    const emotes = reactions
        .get(messageId)

    const elements = ( emotes ?? [] )
        .filter(( reaction ) => reaction.count )
        .map(( reaction ) => [ 
            Reactions.get(reaction.emoteId) , 
            reaction.count 
        ] as const )
        .filter(( value ) : value is [ IconType , number ] => !! value[0] )
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
            name = 'MessageId'
            type = 'submit'
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

                    <span> { local } </span>

                    { ( !! elements.length ) && (

                        <div class = 'Emotes' >
                            { elements } 
                        </div>

                    ) }

                    <div class = 'Options' >

                        <div data-option = 'Context' >
                            <Icon name = 'Context' />
                        </div>

                        <div data-option = 'React' >
                            <Icon name = 'Reaction' />
                        </div>

                    </div>

                    <CSS content = { `
                    
                        [ data-option = Context ]:active {
                            list-style-image : url('${ apiUrl(`Spark?Scope=Message:Option&Action=Click&Option=Context&Message=${ messageId }&Time=${ Date.now() }`) }') ;
                        }

                        [ data-option = React ]:active {
                            list-style-image : url('${ apiUrl(`Spark?Scope=Message:Option&Action=Click&Option=React&Message=${ messageId }&Time=${ Date.now() }`) }') ;
                        }
                    
                    ` } />

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
