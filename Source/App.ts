
export { database , router , redraw , Reactions }

import { authenticateLogin, validateLoginCredentials } from './Routes/Login/Authentication/mod.ts'
import { Application , Context, Next, Router } from 'Oak'
import { messages, reactions, sessions } from './State.ts'
import { WithSession, validateSession } from './Routes/Session.ts'
import { routePostMessage } from './Routes/Chat/Post.tsx'
import { routeChatInput } from './Routes/Chat/Input.tsx'
import { routeMessages } from './Routes/Chat/Messages.ts'
import { Account, User } from './Types.ts'
import { CookieNotice } from './Frames/CookieNotice.tsx'
import { hashPassword } from './Security/Hash.ts'
import { routeLogout } from './Routes/Logout/Form.ts'
import { logoutUser } from './Routes/Logout/Action.ts'
import { routeLogin } from './Routes/Login/Form.tsx'
import { routeAsset } from './Routes/Assets.ts'
import { routeHome } from './Routes/Page.ts'
import { render } from 'Render'


const { debug , clear } = console


clear()
debug(`Starting HTML-Only Chat`)


function redraw (){

    for ( const session of sessions.values() ){

        const connection = session.messages

        connection?.write(`<meta http-equiv = refresh content = 0 />`)
        connection?.close()
    }
}


async function onlyLoggedIn (
    context : Context<WithSession> ,
    next : Next
){

    if( context.state.loggedIn )
        return await next()

    context.response.status = 403
    context.response.body = JSON.stringify({
        problem : `You must be logged in to use this feature`
    })
}


const router = new Router

router.use(validateSession)

router.get('/Assets/:path+',routeAsset)
router.get('/',routeHome)

router.post('/Chat/Input/Post',onlyLoggedIn,routePostMessage)
router.get('/Chat/Input',onlyLoggedIn,routeChatInput)
router.get('/Chat',routeMessages)

router.get('/Login',routeLogin)
router.post('/Login',validateLoginCredentials,authenticateLogin)

router.get('/Logout',routeLogout)
router.post('/Logout',onlyLoggedIn,logoutUser)

router.get('/Cookie',( context ) => context.response.status = 200 )
router.get('/Cookie/Notice',( context ) => context.response.body = render(CookieNotice()))



import { z } from 'Zod'

const SelectForm = z.object({
    messageId : z.string().uuid()
})


type SelectForm = z.infer<typeof SelectForm>


const Template_Selected_Message = ( messageIndex : number ) =>
    `<style> :root { --Selected_Message : ${ messageIndex } ; } </style>`


router.post('/Chat/Select',onlyLoggedIn,async ( context ) => {

    const body = await context.request.body().value

    const params = ( body as URLSearchParams )

    const data = {
        messageId : params.get('MessageId')
    }

    const form = SelectForm.parse(data)

    const messageId = form.messageId

    if( messages.has(messageId) ){

        const { sessionId } = context.state

        const session = sessions.get(sessionId)!
        const index = session.sessionIds.indexOf(messageId)
        const html = Template_Selected_Message(index)

        session.selectedMessage = messageId
        session.messages?.write(html)
    }

    context.response.status = 200
})



const ReactToggleForm = z.object({
    emote : z.string().uuid()
})

router.post('/Chat/React/Toggle',onlyLoggedIn,async ( context ) => {

    const body = await context.request.body().value

    const params = ( body as URLSearchParams )

    const data = {
        emote : params.get('Emote')
    }

    const form = ReactToggleForm.safeParse(data)

    if( ! form.success ){
        console.error(form.error)
        context.response.status = 400
        return
    }

    const emoteId = form.data.emote

    console.log('React',emoteId)

    const session = sessions.get(context.state.sessionId)!

    const { selectedMessage } = session

    const accountId = session.accountId!

    if( selectedMessage ){

        const message = messages.get(selectedMessage)

        if( message ){

            if( ! reactions.has(message.messageId) )
                reactions.set(message.messageId,[])

            const reacts = reactions.get(message.messageId)!

            const react = reacts.find(( react ) => react.emoteId === emoteId )

            if( ! react )
                reacts.push({
                    count : 1 ,
                    emoteId ,
                    users : new Set([ accountId ])
                })
            else {

                if( react.users.has(accountId) ){
                    react.count--
                    react.users.delete(accountId)
                } else {
                    react.count++
                    react.users.add(accountId)
                }
            }

            redraw()
        }
    }

    context.response.status = 200

})


const Reactions = new Map
Reactions.set(crypto.randomUUID(),'1')
Reactions.set(crypto.randomUUID(),'2')
Reactions.set(crypto.randomUUID(),'3')
Reactions.set(crypto.randomUUID(),'4')
Reactions.set(crypto.randomUUID(),'5')


router.get('/Chat/React',onlyLoggedIn,async ( context ) => {

    context.response.body = `

    <!DOCTYPE html>
    <html><body>

        <form
            action = '/Chat/React/Toggle'
            target = 'void'
            method = 'post'
            id = 'reactions'
        >

            ${ Array.from(Reactions.keys())
                .map(( reaction ) => `<button name = 'Emote' value = '${ reaction }' ></button>`)
                .join('') }

            <style>

                form {
                    cursor : default ;

                    grid-template-columns : repeat( auto-fill , 64px ) ;
                    display : grid ;
                    gap : 10px ;
                }

                #reactions button {

                    background-color : transparent ;
                    background-size : contain ;
                    outline : none ;
                    cursor : pointer ;
                    border : none ;
                    color : transparent ;

                    height : 64px ;
                    width : 64px ;

                    border-radius : 4px ;

                    transition : 0.1s ;

                    background-origin : content-box ;
                    background-repeat : no-repeat ;

                    padding : 3px ;
                }


                #reactions button:hover {
                    background-color : #ffffff1a ;
                }

                ${ Array.from(Reactions.entries())
                    .map(([ id , asset ]) => `[ value = '${ id }' ] { background-image : url(/Assets/Emote/${ asset }.png) ; }`)
                    .join('') }

            </style>

        </form>

        </body>
        </html>

    `
})


const database = await Deno.openKv('./Database/Storage.db');


const accountId = '253bff2c-f757-4708-94fc-857698948678'
const userSalt = new Uint8Array([ ... new Array(16).fill(2) ])
const userPassword = new TextEncoder().encode('pass')


const account = {
    password : hashPassword({
        password : userPassword ,
        salt : userSalt
    }),
    accountId ,
    handle : 'user' ,
    salt : userSalt
} satisfies Account


await database.set([ 'Account_By_Handle' , account.handle.toLowerCase() ] , account )
await database.set([ 'Account_By_Id' , accountId ] , account )

const user = {
    nick : 'User'
} satisfies User

await database.set([ 'User_By_Id' , accountId ] , user )


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

