
export { middleware as routeAPI }

import { in20Minutes , Pages } from 'Misc'
import { createAccount } from 'AccountId'
import { BaseState } from '../../../Routes/State.ts'
import { Session } from 'Misc/Session'
import { Context } from 'Oak'


async function middleware (
    context : Context<BaseState>
){

    const { response , cookies } = context

    const account = await createAccount()

    const session = new Session(account.userId)


    response.headers.set(
        'Cache-Control' ,
        'no-cache="Set-Cookie"'
    )

    await cookies.set('Session',session.id,{
        sameSite : 'lax' ,
        httpOnly : true ,
        expires : in20Minutes() ,
        secure : false ,
        path : '/'
    })

    response.redirect(Pages.Home)
}
