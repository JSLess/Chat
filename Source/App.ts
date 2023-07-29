
import { Application , Router } from 'Oak'
import { messages , users } from './State.ts'
import { renderMessages } from './Messages.tsx'
import { AsyncResponse } from './AsyncResponse.ts'
import { crypto } from 'Deno/crypto/mod.ts'
import { render } from 'Render'
import { Page } from './Page.tsx'

import Favicon from './Favicon.ts'


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

    context.response.status = 200

    redraw()
})


const app = new Application({
    logErrors : false
})

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

