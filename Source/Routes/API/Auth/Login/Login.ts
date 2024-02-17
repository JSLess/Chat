
export type { Credentials }
export { middleware as routeLogin }

import { deleteCookie , setCookie } from 'HTTP'
import { userIdByAccount } from 'Database'
import { sessions } from 'State'
import { Context } from 'Oak'
import { Session } from "../../../../Misc/Types.ts";


interface Credentials {
    accountId : string
}


async function middleware (
    context : Context<Credentials>
){

    const { accountId } = context.state

    const id = BigInt(accountId)

    const userId = await userIdByAccount(id)

    console.log('AccountId',accountId,id)

    if( ! userId.value ){

        context.response.headers.set('Cache-Control','no-cache="Set-Cookie"')

        deleteCookie(context.response.headers,'Session',{
            path : '/'
        })

        interface Error {
            type : string
        }

        let errors : Array<Error>

        try {
            errors = JSON.parse(atob(context.request.headers.get('Errors') ?? '') ?? '[]')
        } catch {
            errors = []
        }

        errors.push({
            type : 'Invalid AccountId'
        })

        setCookie(context.response.headers,{
            name : 'Errors' ,
            value : btoa(JSON.stringify(errors)) ,
            path : '/' ,
            httpOnly : true ,
            secure : false ,
            sameSite : 'Lax' ,
            expires : new Date(Date.now() + 1000 * 60 * 20)
        })



        context.response.redirect('/')

        return
    }

    const sessionId = crypto.randomUUID()

    const session = {
        sessionIds : []
    } as Session


    sessions.set(sessionId,session)

    session.userId = userId.value

    console.log('AccountId',sessionId,session,accountId)


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
