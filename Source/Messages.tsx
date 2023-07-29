
export { renderMessages }

import { Message , User } from './Types.ts'
import { messages } from './State.ts'
import { render } from 'Render'


interface Props {
    messages : Array<Message>
    user : User
}


function Component ( props : Props ){

    const { messages } = props

    const elements = messages.map(( message ) => (

        <div class = 'Message' >

            { message.time.toLocaleTimeString(undefined,{ timeStyle : 'short' }) } : { message.message }

        </div>
    ))

    return <>

        <link
            href = '/Assets/Messages.css'
            rel = 'stylesheet'
        />

        <div class = 'Messages' >
            { elements }
        </div>

        <iframe name = 'void' />

        <form
            encType = 'multipart/form-data'
            target = 'void'
            action = '/post'
            method = 'post'
            id = 'Input'
        >

            <input
                value = { props.user.userId }
                type = 'hidden'
                name = 'userId'
            />

            <input
                placeholder = 'Message'
                spellCheck = { true }
                required = { true }
                name = 'message'
                type = 'text'
            />

        </form>
    </>
}


function renderMessages ( user : User ){

    const msgs = [ ... messages.values() ]

    const element =
        <Component messages = { msgs } user = { user } />

    return render(element)
}
