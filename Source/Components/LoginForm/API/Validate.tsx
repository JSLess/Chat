
export { middleware as validateCredentials }

import { deleteCookie , setCookie } from 'HTTP'
import { Context , Next } from 'Oak'
import { Credentials } from './Login.ts'
import { BaseState } from "../../../Routes/State.ts";


async function middleware (
    context : Context<BaseState & Credentials> ,
    next : Next
){

    const form = await context.request.body({ type : 'form' }).value


    const accountId = form.get('Account')

    if( ! accountId ){

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
            type : 'Missing AccountId'
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

        return
    }


    context.state = { ... context.state , accountId }


    return await next()
}
