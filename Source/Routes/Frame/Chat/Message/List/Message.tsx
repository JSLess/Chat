
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

    const params = new URLSearchParams
    params.set('Scope','Message:Option')
    params.set('Action','Click')
    params.set('Time',Date.now().toString())
    params.set('Message',messageId)
    
    const params_context = new URLSearchParams(params)
    params_context.set('Option','Context')

    const params_react = new URLSearchParams(params)
    params_react.set('Option','React')


    const css = `
    
        [ data-option = Context ]:active {
            list-style-image : url('${ apiUrl(`Spark?${ params_context.toString() }`) }') ;
        }

        [ data-option = React ]:active {
            list-style-image : url('${ apiUrl(`Spark?${ params_react.toString() }`) }']) ;
        }
    `

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

                    <CSS content = { css } />

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
