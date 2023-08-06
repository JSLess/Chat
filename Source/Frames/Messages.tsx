
export { renderMessages }

import { messages , users } from '../State.ts'
import { Message , User } from '../Types.ts'
import { render } from 'Render'


function renderMessages (){

    const msgs = [ ... messages.values() ]

    return render((

        <Messages
            messages = { msgs }
        />
    ))
}


interface Props {
    messages : Array<Message>
}

function Messages ( props : Props ){

    const { messages } = props

    const elements = messages.map(renderMessage)

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


function renderMessage ( message : Message ){

    const { time } = message

    const local = time
        .toLocaleTimeString(undefined,{ timeStyle : 'short' })

    return <>

        <div class = 'Message' >

            { local } : { users.get(message.accountId)?.nick ?? '???' } { message.message }

        </div>
    </>
}
