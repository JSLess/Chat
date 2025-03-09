
export type { MessagesArgs }
export { Messages }

import { Message as MessageComp } from './Message.tsx'
import { Message , Session } from 'Misc/Types'
import { BaseDocument } from 'Framework'
import { CSS } from 'Misc';


interface MessagesArgs {
    messages : Array<Message>
    session : Session
}


async function Messages ( 
    args : MessagesArgs 
){

    const { messages , session } = args

    const elements = await Promise.all(messages
        .map(( message ) => MessageComp({ message , session })))

    let selected = 0

    if( session.selectedMessage )
        selected = session.sessionIds.indexOf(session.selectedMessage)

    return (

        <BaseDocument
            name = 'Messages'
        >

            <form
                action = '/API/Chat/Message/Select'
                target = 'void'
                method = 'post'
            >

                <div class = 'Messages' >
                    { elements }
                </div>

            </form>

            <iframe name = 'void' />

            <CSS content = { `
                
                :root { 
                    --Selected_Message : ${ selected } ; 
                    color : red ; 
                }

            ` } />

        </BaseDocument>
    )
}

