

import { Application , Router } from 'Oak'
import { messages , users } from './State.ts'
import { AsyncResponse } from './AsyncResponse.ts'
import { renderMessages } from './Messages.tsx'
import { crypto } from 'Deno/crypto/mod.ts'
import { render } from 'Render'
import { Page } from './Page.tsx'

const { debug } = console

debug(`Starting HTML-Only Chat`)


function redraw (){

    for ( const user of users.values() )
        user.response.write(renderMessages())
}



const router = new Router

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

                <style>

                    body {
                        flex-direction : column ;
                        align-items : center ;
                        display : flex ;
                        padding : 4rem ;
                        margin : 0 ;
                    }

                    #Messages {
                        max-width : 800px ;
                        width : 100% ;
                    }

                    iframe[ name = void ]{
                        display : none ;
                    }

                </style>
            <head>
            <body>
                ${ body }
            </body>
        </html>
    `
})

router.get('/chat',( context ) => {

    const { response } = context
    const { headers } = response

    headers.set('Content-Type','text/html;charset=utf-8')
    headers.set('Transfer-Encoding','chunked')
    headers.set('Content-Encoding','chunked')
    headers.set('Connection','keep-alive')

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


    response.body = user.response
    user.response.write(renderMessages())
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


const app = new Application
app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 })

