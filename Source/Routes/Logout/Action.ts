
export { logoutUser }

import { WithSession } from '../Session.ts'
import { sessions } from '../../State.ts'
import { Context } from 'Oak'
import { delay } from 'https://deno.land/std@0.215.0/async/delay.ts'


async function logoutUser (
    context : Context<WithSession>
){

    const before = Date.now()

    if( context.state.loggedIn )
        sessions.delete(context.state.sessionId)

    const after = Date.now()

    const remaining = 100 - ( after - before )

    await delay(remaining)

    console.log('Logout',context.state)


    await context.cookies.delete('Session')

    // context.response.body = `
    //     <html>
    //         <body>
    //             <p> Redirecting ... </p>
    //         </body>
    //     </html>
    // `

    context.response.redirect('/')
}
