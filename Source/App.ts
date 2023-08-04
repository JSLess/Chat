
import { Application , Context, RouteParams, Router } from 'Oak'
import { messages , users } from './State.ts'
import { renderMessages } from './Messages.tsx'
import { AsyncResponse } from './AsyncResponse.ts'
import { crypto } from 'Deno/crypto/mod.ts'
import { render } from 'Render'
import { Input } from './Input.tsx'
import { Page } from './Page.tsx'

import Favicon from './Favicon.ts'
import { CookieNotice } from "./CookieNotice.tsx";
import { Login } from "./Login.tsx";
import { comparePasswords , hashPassword } from "./Security/Hash.ts";




const { debug } = console

debug(`Starting HTML-Only Chat`)


function redraw (){

    for ( const user of users.values() ){
        user.response.write(`<meta http-equiv = refresh content = 0 />`)
        user.response.close()
    }
}


const router = new Router

router.get('/Assets/:path+',async ( context ) => {

    const root = `${ Deno.cwd() }/Source/Static`

    const path = context.request.url.pathname.replace(/^\/Assets\//,'')

    console.log('root',root,path)


    try {

        await context.send({ root , path })

    } catch {
        context.response.status = 404
    }

})


router.get('/',( context ) => {

    const userId = crypto
        .randomUUID()

    const reader = new AsyncResponse

    const user = {
        userId ,
        username : crypto.randomUUID() ,
        messages : [] ,
        response : reader
    }

    console.debug('User Joined',userId)

    const messageId = crypto
        .randomUUID()

    messages.set(messageId,{
        messageId : messageId ,
        userId : userId ,
        time : new Date ,
        message : `User ${ userId } joined`
    })

    redraw()

    users.set(userId,user)

    const body = render(Page({
        user : user
    }))


    context.response.body = `

        <!DOCTYPE html>
        <html>
            <head>

                <title> Chat </title>

                <link
                    href = '/Assets/Style.css'
                    rel = stylesheet
                />

                <link
                    href = '${ Favicon }'
                    type = image/x-icon
                    rel = icon
                />

            <head>
            <body>
                ${ body }
            </body>
        </html>
    `
})

router.get('/input',( context ) => {

    const userId = new URL(context.request.url).searchParams.get('userId')

    if( ! userId ){

        context.response.status = 400
        context.response.body = JSON
            .stringify({
                problem : `The userId field is missing`
            })

        debug(`/chat Missing UserId`)

        return
    }

    const user = users.get(userId)

    if( ! user ){

        context.response.status = 400
        context.response.body = JSON
            .stringify({
                problem : `The user with the given Id does not exist`
            })

        debug(`/chat Missing User`)

        return
    }


    const html = render(Input({ user }))

    console.log(html)

    context.response.body = `
    <!DOCTYPE html>
        <html>
            <head>
                <link
                    href = '/Assets/Input.css'
                    rel = stylesheet
                />
            </head>
            <body>
                ${ html }
            </body>
        </html>
    `
})


router.get('/chat',( context ) => {

    const { response } = context


    const userId = new URL(context.request.url).searchParams.get('userId')

    if( ! userId ){

        context.response.status = 400
        context.response.body = JSON
            .stringify({
                problem : `The userId field is missing`
            })

        debug(`/chat Missing UserId`)

        return
    }

    const user = users.get(userId)

    if( ! user ){

        context.response.status = 400
        context.response.body = JSON
            .stringify({
                problem : `The user with the given Id does not exist`
            })

        debug(`/chat Missing User`)

        return
    }


    const { headers } = response

    headers.set('Content-Type','text/html;charset=utf-8')
    headers.set('Transfer-Encoding','chunked')
    headers.set('Content-Encoding','chunked')
    headers.set('Connection','keep-alive')
    headers.set('Keep-Alive',`timeout=${ 60 * 60 }`)

    response.body = user.response = new AsyncResponse
    user.response.write(renderMessages(user))
})



router.post('/post',async ( context ) => {

    const form = await context.request.body({ type : 'form-data' }).value.read()

    const { fields } = form

    const message = fields.message

    if( ! message ){

        context.response.status = 400
        context.response.body = JSON
            .stringify({
                problem : `The message field is missing`
            })

        return
    }

    const userId = fields.userId

    if( ! userId ){

        context.response.status = 400
        context.response.body = JSON
            .stringify({
                problem : `The userId field is missing`
            })

        return
    }

    const user = users.get(userId)

    if( ! user ){

        context.response.status = 400
        context.response.body = JSON
            .stringify({
                problem : `The user with the given Id does not exist`
            })

        return
    }

    const messageId = crypto
        .randomUUID()

    messages.set(messageId,{
        messageId : messageId ,
        userId : userId ,
        time : new Date ,
        message : message
    })

    user.messages.push(messageId)

    context.response.body = `
    <!DOCTYPE html>
        <html>
            <head>
                <link
                    href = '/Assets/Input.css'
                    rel = stylesheet
                />
            </head>
            <body>
                ${ render(Input({ user })) }
            </body>
        </html>
    `

    redraw()
})


router.get('/Login',( context ) => {

    context.response.body = `
    <!DOCTYPE html>
        <html>
            <head>
                <link
                    href = '/Assets/Login.css'
                    rel = stylesheet
                />
            </head>
            <body>
                ${ render(Login({ notices : [] })) }
            </body>
        </html>
    `
})


interface Session {

}

const database = await Deno.openKv('./Database/Storage.db');



interface Account {

    accountId : string
    handle : string

    password : Uint8Array
    salt : Uint8Array
}


const accountId = '253bff2c-f757-4708-94fc-857698948678'
const userSalt = new Uint8Array([ ... new Array(16).fill(2) ])
const userPassword = new TextEncoder().encode('password')


const account = {
    password : hashPassword({
        password : userPassword ,
        salt : userSalt
    }),
    handle : 'admin' ,
    accountId : accountId ,
    salt : userSalt
} satisfies Account



await database.set([ 'Account_By_Id' , account.accountId ] , account )
await database.set([ 'Account_By_Handle' , account.handle ] , account )


function isValidUsername ( username : string ){

}


const sessions = new Map<string,string>


/**
 *  For re-authentication, discard
 *  any existing sessionId
 */

router.post('/Login', async ( context , next ) => {

    const { cookies } = context

    const sessionId = await
        cookies.get('Session')

    if( sessionId && sessions.has(sessionId) )
        sessions.delete(sessionId)

    return await next()
})


interface Credentials {
    password : string
    handle : string
}


router.post<RouteParams<string>,Credentials>('/Login', async ( context , next ) => {

    const form = await context.request.body({ type : 'form' }).value


    const handle = form.get('handle')

    if( handle ){
        context.response.status = 400
        context.response.body = `
            <!DOCTYPE html>
                <html>
                    <head>
                        <link
                            href = '/Assets/Login.css'
                            rel = stylesheet
                        />
                    </head>
                    <body>
                        ${ render(Login({ notices : [{
                            title : 'Missing Handle' ,
                            description : `No user handle has been specified`
                        }] })) }
                    </body>
                </html>
        `

        return
    }


    const password = form.get('password')

    if( ! password ){
        context.response.status = 400
        context.response.body = JSON.stringify({
            problem : `No password was specified`
        })

        return
    }


    context.state = { ... context.state , handle : handle! , password }


    return await next()
})

router.post<RouteParams<string>,Credentials>('/Login', async ( context ) => {

    const { password , handle } = context.state



    const account = (await database.get<Account>([ 'Account_By_Handle' , handle ])).value ?? {
        accountId : '' ,
        handle : '' ,
        password : crypto.getRandomValues(new Uint8Array(32)) ,
        salt : crypto.getRandomValues(new Uint8Array(32))
    }


    const password_bytes = new TextEncoder().encode(password)


    const isMatching = comparePasswords({
        password : password_bytes ,
        hashed : account.password ,
        salt : account.salt
    })


    if( ! isMatching ){
        context.response.status = 403
        context.response.body = JSON.stringify({
            problem : `Either the account doesn't exist or the given password is incorrect`
        })

        return
    }



    const sessionId = crypto.randomUUID()

    sessions.set(sessionId,accountId)

    context.response.headers.set('Cache-Control','no-cache="Set-Cookie"')

    context.cookies.set('Session',sessionId,{
        httpOnly : true ,
        secure : false ,
        sameSite : true ,
        path : '/' ,
        expires : new Date(new Date().getMilliseconds() + 1000 * 60 * 20)
    })
})


interface State {
    sessionId : null | string
}


const app = new Application<State>({
    logErrors : false
})


// app.use( async ( context , next ) => {

//     const path = context.request.url.pathname

//     const isCookieCheck = ( path === '/Cookie' )

//     if( isCookieCheck ){

//         if( await context.cookies.has('Session') ){
//             console.log('Redirecting back to home')
//             context.response.redirect(context.request.url.searchParams.get('ReturnTo') || '/')
//             return
//         }

//         cookieNotice(context)
//         return

//     } else {

//         if( await context.cookies.has('Session') )
//             return next()

//         console.log('Trying to set session cookie')

//         const sessionId = crypto.randomUUID()

//         context.cookies.set('Session',sessionId)

//         let url = '/Cookie'

//         if( path !== '/' )
//             url += `?ReturnTo=${ encodeURIComponent(path) }`

//         context.response.redirect(url)
//         return
//     }
// })


function cookieNotice ( context : Context<State,State> ){

    context.response.status = 403
    context.response.body = `

    <!DOCTYPE html>
    <html>
        <head>

            <title> Missing Cookies </title>

            <link
                href = '/Assets/Style.css'
                rel = stylesheet
            />

            <link
                href = '${ Favicon }'
                type = image/x-icon
                rel = icon
            />

        <head>
        <body>
            ${ render(CookieNotice()) }
        </body>
    </html>
`


}


app.use(router.routes())
app.use(router.allowedMethods())


app.addEventListener('error',( event ) => {

    event.stopImmediatePropagation()
    event.preventDefault()

    if( event.message === `connection closed before message completed` )
        return

    if( event.error instanceof Error ){

        if( event.error.message === `connection closed before message completed` )
            return
    }

    console.error(event)
})

await app.listen({ port : 8000 })

