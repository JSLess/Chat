
export { renderMessages }

import { Account , Message , User } from '../Types.ts'
import { database } from '../App.ts'
import { messages } from '../State.ts'
import { render } from 'Render'


async function renderMessages (){

    const msgs = [ ... messages.values() ]

    return render( await Messages({ messages : msgs }) )
}


interface Props {
    messages : Array<Message>
}

async function Messages ( props : Props ){

    const { messages } = props

    const elements = await Promise.all(messages.map(renderMessage))

    return <>

        <link
            href = '/Assets/Messages.css'
            rel = 'stylesheet'
        />

        <div
            children = { elements }
            class = 'Messages'
        />

        <iframe name = 'void' />
    </>
}


async function renderMessage ( message : Message ){

    const { time } = message

    const local = time
        .toLocaleTimeString(undefined,{ timeStyle : 'short' })


    const name =
        await nick(message.accountId) ??
        await handle(message.accountId) ??
        '???'


    return <>

        <div class = 'Message' >

            { local } : { name } : { message.message }

        </div>
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
