
export type { Credentials }
export { routeAPI }

import { in20Minutes , Cookies , Pages } from 'Misc'
import { deleteCookie , setCookie } from 'HTTP'
import { userIdByAccount } from 'Database'
import { Session } from 'Misc/Session'
import { Context } from 'Oak'


interface Credentials {
    accountId : string
}

interface Error {
    type : string
}


async function routeAPI (
    context : Context<Credentials>
){

    const { response , request , cookies , state } = context

    const { accountId } = state

    const id = BigInt(accountId)

    const userId = await userIdByAccount(id)

    console.debug('AccountId',accountId,id)

    if( ! userId.value ){

        response.headers.set('Cache-Control','no-cache="Set-Cookie"')

        deleteCookie(response.headers,Cookies.Session,{
            path : '/'
        })

        
        let errors : Array<Error>

        try {
            errors = JSON.parse(atob(request.headers.get('Errors') ?? '') ?? '[]')
        } catch {
            errors = []
        }

        errors.push({
            type : 'Invalid AccountId'
        })

        setCookie(response.headers,{
            sameSite : 'Lax' ,
            httpOnly : true ,
            expires : in20Minutes() ,
            secure : false ,
            value : btoa(JSON.stringify(errors)) ,
            name : Cookies.Errors ,
            path : '/' ,
        })

        response.redirect(Pages.Home)

        return
    }

    const session = new Session(userId.value)

    console.log('AccountId',session,accountId)


    response.headers.set(
        'Cache-Control' , 
        'no-cache="Set-Cookie"'
    )

    await cookies.set(Cookies.Session,session.id,{
        sameSite : 'lax' ,
        httpOnly : true ,
        expires : in20Minutes() ,
        secure : false ,
        path : '/'
    })

    response.redirect(Pages.Home)
}
