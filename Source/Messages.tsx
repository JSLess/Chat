
export { renderMessages }

import { Message } from './Types.ts'
import { messages , users } from './State.ts'
import { render } from 'Render'


interface Props {
    messages : Array<Message>
    millis : string
}

function Component ( props : Props ){

    const { messages } = props

    const elements = messages.map(( message ) => (

        <div class = 'Message' >

            { message.message }

        </div>
    ))

    return <>

        <div id = { props.millis } >
            { elements }
        </div>
    </>
}


function renderMessages ( ){

    const timestamp = new Date()

    const millis = '_' + timestamp
        .getMilliseconds()
        .toString()

    const msgs = [ ... messages.values() ]

    const element =
        <Component messages = { msgs } millis = { millis } />

    const html = render(element)

    return `<style>
        body > :not(#${ millis }){ display : none }
        body > #${ millis }{ display : block }
    </style>${ html }`
}
