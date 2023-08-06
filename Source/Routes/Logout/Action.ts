
export { logoutUser }

import { WithSession } from '../Session.ts'
import { sessions } from '../../State.ts'
import { Context } from 'Oak'


async function logoutUser (
    context : Context<WithSession>
){

    const { sessionId } = context.state

    sessions.delete(sessionId)

    await context.cookies.delete('Session')

    context.response.body = `
        <html>
            <body>
                <p> Redirecting ... </p>
            </body>
        </html>
    `

    context.response.redirect('/')
}
