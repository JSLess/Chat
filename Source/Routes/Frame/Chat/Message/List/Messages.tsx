
export { Messages }
export { Style as MessagesStyle }

import { Message as MessageComp } from './Message.tsx'
import { BaseDocument , SetVar } from 'Framework'
import { Message , Session } from 'Misc/Types'
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

            header = { <>
                    <Stylesheet path = 'Messages' />
                    <Stylesheet path = 'Message' />
                </>
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
                            ${ SetVar('Selected_Message',selected) } ;
                            color : red ;
                        }

                    ` } />
                </>
            }

        />
    )
}


const Style = /* CSS */ `

    :root {
        --background : #1c1817 ;
        --secondary : #1a2c2d ;
        --primary : #5e6d6e ;
        --accent : #bf3831 ;
        --text : #f5f9f9 ;


        ---Unselected : var(--background) ;
        ---Selected : white ;
    }


    * {
        font-family : monospace ;
        font-size : 18px ;
    }

    body {
        height : calc( 100% - 16px ) ;
    }

    form {
        margin : 0 ;
    }


    .Messages {
        flex-grow : 1 ;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        color: var(--text);
        padding: 0.5rem;
        overflow-y: auto;
    }
`
