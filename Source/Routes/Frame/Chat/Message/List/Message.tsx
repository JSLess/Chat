
export type { MessageOption }
export { Component as Message }
export { Style as MessageStyle }

import { Reactions , IconType } from '../../../../../Reactions/Groups.ts'
import { Message , Session } from 'Misc/Types'
import { toAgoString } from 'Misc/Time'
import { reactions } from 'State'
import { userById } from 'Database'
import { Emote } from './Emote.tsx'
import { Icon } from 'UI/Parts'
import { API } from '../../../../API/Routes.ts'
import { CSS } from 'Misc'


interface Args {
    message : Message ,
    session : Session
}


const Options = {
    Context : 'Context' ,
    React : 'React'
} as const

type MessageOption = typeof Options[ keyof typeof Options ]


async function Component ({
    message , session
} : Args ){

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

        [ data-option = '${ Options.Context }' ]:active {
            list-style-image : url('${ API.Spark }?${ params_context.toString() }') ;
        }

        [ data-option = '${ Options.React }' ]:active {
            list-style-image : url('${ API.Spark }?${ params_react.toString() }']) ;
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
                action = { API.Chat.React }
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



const Style = /* CSS */ `

    input[ name = MessageId ]{
        display : none ;
    }

    .Message {

        /* -Inf -> +Inf | 0 = Message is selected */

        ----Delta : ( var( --Selected_Message ) - var( ----Message_Index ) ) ;

        /* 0 - Inf | Absolute */

        ----Abs : max( var( ----Delta ) , -1 * var( ----Delta ) ) ;

        /* 0 or 1 | Normalizing */

        ----Norm : clamp( 0 , var( ----Abs ) , 1 ) ;

        /* Percentage */

        ----Percent : calc( 100 * var( ----Norm ) ) ;
        ----Invert-Percent : calc( 100 - var( ----Percent ) ) ;

        ----Unselect-Percent : calc( 1% * var( ----Percent ) ) ;
        ----Select-Percent : calc( 1% * var( ----Invert-Percent ) ) ;


        /* Switch between 2 colors */

        ----Border : color-mix( in srgb
            , var( ---Unselected ) var( ----Unselect-Percent )
            , var( ---Selected ) var( ----Select-Percent )
        ) ;


        border-radius : 4px ;
        border : 1px solid var( ----Border ) ;
        border-width : 0 0 0 2px ;

        padding-inline : 1rem 0.25rem ;
        padding-block : 0.25rem ;

        cursor : pointer ;

        transition :
            border-color 200ms ease-in-out ,
            background 100ms ease-in-out ;

        display: grid;
        grid-template-columns: 1fr auto;

        position : relative ;
    }

    .Message:hover {
        background : #657576 ;
    }

    .Message p {
        margin-block : 0 ;
    }

    .Message span {
        user-select : none ;
    }

    .Message .Emotes {
        margin-top : 0.5rem ;
        display : flex ;
        gap : 0.5rem ;
        user-select : none ;
    }

    .Message .Emotes:empty {
        display : none ;
    }

    .Message .Emote {

        position : relative ;

        padding : 0.15rem 0.4rem ;

        background : #ffffff14 ;
        border-radius : 5px ;
        border : 1px solid #ffffff5c ;

        font-family : sans-serif ;
        font-weight : 600 ;
        line-height : 1 ;

        display : flex ;
    }

    .Message .Emote span {

        vertical-align : baseline ;
        font-size : 100% ;

        margin-left : 0.3rem ;

        translate : 0 2px ;
    }

    .Message:hover > span {
        visibility : hidden ;
    }

    .Message .Emote img {

        vertical-align : middle ;

        aspect-ratio : 1 ;
        width : 20px ;
    }

    .Message:not(:hover) .Options {
        opacity : 0 ;
        transition : all 50ms ease-in-out ;
    }


    .Options {

        border-radius : 3px ;
        padding : 2px ;

        position : absolute ;
        inset-block : 0 ;
        right : 0 ;

        margin-block : auto ;

        max-height : 1.5rem ;
        width : fit-content ;

        justify-content : flex-end ;
        align-items : stretch ;
        display : flex ;
        gap : 0.5rem ;

        transition : all 100ms ease-in-out ;
    }


    .Options > * {

        height : 1.2rem ;
        width : 1.2rem ;

        text-align : center ;

        justify-content : center ;
        align-items : center ;
        display : flex ;
    }



    iframe[ name = void ]{
        display : none ;
    }
`
