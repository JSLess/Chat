
export { validateCredentials }

import { deleteCookie , setCookie } from 'HTTP'
import { Context , Next } from 'Oak'
import { Credentials } from './Login.ts'
import { BaseState } from '../../../Routes/State.ts'


async function validateCredentials (
    context : Context<BaseState & Credentials> ,
    next : Next
){

    const form = await context.request.body.formData()

    const accountId = form.get('Account')?.toString()

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
            sameSite : 'Lax' ,
            httpOnly : true ,
            expires : new Date(Date.now() + 1000 * 60 * 20) ,
            secure : false ,
            value : btoa(JSON.stringify(errors)) ,
            name : 'Errors' ,
            path : '/'
        })

        return
    }


    context.state = { ... context.state , accountId }


    return await next()
}
