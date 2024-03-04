
export { Messages }

import { Message as MessageComp } from './Message.tsx'
import { Message , Session } from '../../../../../Misc/Types.ts'
import { BaseDocument } from 'Framework'


interface Props {
    messages : Array<Message>
    session : Session
}


async function Messages ( props : Props ){

    const { messages , session } = props

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

                <div
                    children = { elements }
                    class = 'Messages'
                />

            </form>

            <iframe name = 'void' />

            <style children = { `
                :root { --Selected_Message : ${ selected } ; color : red ; }
            ` } />

        </BaseDocument>
    )
}

