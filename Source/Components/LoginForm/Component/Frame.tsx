
export { middleware as routeFrame }

import { deleteCookie , setCookie } from 'HTTP'
import { BaseDocument } from 'Framework'
import { Context } from 'Oak'
import { render } from 'Render'
import { Login } from './mod.tsx'


async function middleware (
    context : Context
){

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
    } catch ( exception ){
        errors = []
    }

    const notices : Array<{ title : string , description : string }> = []

    errors = errors.filter(( error ) => {

        if( error.type === 'Invalid AccountId' ){

            notices.push({
                title : 'Missing Handle' ,
                description : `Either the account doesn't exist or the given password is incorrect`
            })

            return false
        }

        return true
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


    context.response.body = render(BaseDocument({
        children : Login({ notices }) ,
        name : 'LoginForm'
    }))
}
