
export { middleware as routeRegister }

import { createAccount } from "../../../Security/AccountId.ts"
import { BaseState } from "../../State.ts"
import { sessions } from 'State'
import { Session } from "../../../Misc/Types.ts"
import { Context } from 'Oak'


async function middleware (
    context : Context<BaseState>
){

    const account = await createAccount()

    const sessionId = crypto.randomUUID()

    const session = {
        sessionIds : [] ,
        contexts : {} ,
        frames : {}
    } as Session


    sessions.set(sessionId,session)

    session.userId = account.userId


    context.response.headers.set('Cache-Control','no-cache="Set-Cookie"')

    await context.cookies.set('Session',sessionId,{
        httpOnly : true ,
        secure : false ,
        sameSite : 'lax' ,
        path : '/' ,
        expires : new Date(Date.now() + 1000 * 60 * 20)
    })

    context.response.redirect('/')
}
