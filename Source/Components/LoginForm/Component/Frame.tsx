
export { routeFrame }

import { deleteCookie , setCookie } from 'HTTP'
import { in20Minutes , Cookies, Stylesheet } from 'Misc'
import { BaseDocument } from 'Framework'
import { Context } from 'Oak'
import { render } from 'Render'
import { Login } from './mod.tsx'


interface Error {
    type : string
}


async function routeFrame (
    context : Context
){

    const { response , request } = context

    response.headers.set(
        'Cache-Control' ,
        'no-cache="Set-Cookie"'
    )

    deleteCookie(response.headers,Cookies.Session,{
        path : '/'
    })

    

    let errors : Array<Error>

    try {
        errors = JSON.parse(atob(request.headers.get('Errors') ?? '') ?? '[]')
    } catch {
        errors = []
    }

    const notices : Array<{ title : string , description : string }> = []

    errors = errors.filter(( error ) => {

        if( error.type === 'Invalid AccountId' ){

            notices.push({
                description : `Either the account doesn't exist or the given password is incorrect` ,
                title : 'Missing Handle'
            })

            return false
        }

        return true
    })


    setCookie(response.headers,{
        sameSite : 'Lax' ,
        httpOnly : true ,
        secure : false ,
        expires : in20Minutes() ,
        value : btoa(JSON.stringify(errors)) ,
        name : 'Errors' ,
        path : '/'
    })


    const document = BaseDocument({
        
        header : Stylesheet({ path : 'LoginForm' }) ,

        body : Login({ notices })
    })

    response.body = render(document)
}
