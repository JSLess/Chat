
export { database , router , redraw }

import { authenticateLogin, validateLoginCredentials } from './Routes/Login/Authentication/mod.ts'
import { Application , Context, Next, Router } from 'Oak'
import { hashPassword } from './Security/Hash.ts'
import { Account, User } from './Types.ts'
import { routeAsset } from './Routes/Assets.ts'
import { routeHome } from './Routes/Page.ts'
import { routeLogin } from "./Routes/Login/Form.ts";
import { routeMessages } from './Routes/Chat/Messages.ts'
import { sessions } from './State.ts'
import { routeChatInput } from "./Routes/Chat/Input.ts";
import { routePostMessage } from "./Routes/Chat/Post.ts";
import { WithSession, validateSession } from "./Routes/Session.ts";
import { logoutUser } from "./Routes/Logout/Action.ts";
import { routeLogout } from "./Routes/Logout/Form.ts";
import { render } from 'Render'
import { CookieNotice } from "./Frames/CookieNotice.tsx";


const { debug } = console

debug(`Starting HTML-Only Chat`)


function redraw (){

    for ( const session of sessions.values() ){

        const connection = session.messages

        connection?.write(`<meta http-equiv = refresh content = 0 />`)
        connection?.close()
    }
}


async function onlyLoggedIn ( context : Context<WithSession> , next : Next ){

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

