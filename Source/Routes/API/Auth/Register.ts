
export { middleware as routeRegister }

import { database , sessions } from 'State'
import { Context } from 'Oak'
import { BaseState } from "../../State.ts";
import { Session } from "../../../Misc/Types.ts";
import { createAccount } from "../../../Security/AccountId.ts";


async function middleware (
    context : Context<BaseState>
){

    const account = await createAccount()

    const key = [ 'User_By_Id' , account.userId ]

    await database.set(key,{ nick : null })

    const sessionId = crypto.randomUUID()

    const session = {
        sessionIds : []
    } as Session


    sessions.set(sessionId,session)

    session.accountId = account.accountId


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
