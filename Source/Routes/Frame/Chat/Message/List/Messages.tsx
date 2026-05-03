
export { Messages }

import { Message as MessageComp } from './Message.tsx'
import { Message , Session } from 'Misc/Types'
import { BaseDocument } from 'Framework'
import { Stylesheet , CSS } from 'Misc'
import { API } from 'API/Routes'


interface Args {
    messages : Array<Message>
    session : Session
}


async function Messages ({
    messages , session
} : Args ){

    const elements = await Promise.all(messages
        .map(( message ) => MessageComp({ message , session })))

    let selected = 0

    if( session.selectedMessage )
        selected = session.sessionIds.indexOf(session.selectedMessage)

    return (

        <BaseDocument

            header = {
                <Stylesheet path = 'Messages' />
            }

            body = {
                <>
                    <form
                        action = { API.Chat.Message.Select }
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
                </>
            }

        />
    )
}

