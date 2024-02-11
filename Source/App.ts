
export { database , router , redraw , Reactions }

import { authenticateLogin, validateLoginCredentials } from './Routes/Login/Authentication/mod.ts'
import { Application , Context, Next, Router } from 'Oak'
import { WithSession, validateSession } from './Routes/Session.ts'
import { routeReactToggle } from './Routes/Chat/React/Toggle.ts'
import { routePostMessage } from './Routes/Chat/Post.tsx'
import { routeChatSelect } from './Routes/Chat/Select/Post.ts'
import { routeChatReact } from './Routes/Chat/React/Get.tsx'
import { routeChatInput } from './Routes/Chat/Input.tsx'
import { UserDataRoute } from './Routes/User Data/Form.tsx'
import { routeMessages } from './Routes/Chat/Messages.ts'
import { createAccount } from './Security/AccountId.ts'
import { CookieNotice } from './Frames/CookieNotice.tsx'
import { routeLogout } from './Routes/Logout/Form.ts'
import { logoutUser } from './Routes/Logout/Action.ts'
import { routeLogin } from './Routes/Login/Form.tsx'
import { routeAsset } from './Routes/Assets.ts'
import { routeHome } from './Routes/Page.ts'
import { sessions } from './State.ts'
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
router.get('/',onlyDocument,routeHome)

router.post('/Chat/Input/Post',onlyLoggedIn,routePostMessage)
router.get('/Chat/Input',redirectNonFrame,onlyLoggedIn,routeChatInput)
router.get('/Chat',redirectNonFrame,routeMessages)

router.get('/Login',redirectNonFrame,routeLogin)
router.post('/Login',validateLoginCredentials,authenticateLogin)

router.get('/Logout',redirectNonFrame,routeLogout)
router.post('/Logout',logoutUser)

router.post('/Chat/React/Toggle',onlyLoggedIn,routeReactToggle)
router.post('/Chat/Select',onlyLoggedIn,routeChatSelect)

router.get('/Cookie',( context ) => context.response.status = 200 )
router.get('/Cookie/Notice',( context ) => context.response.body = render(CookieNotice()))

router.get('/UserData',async ( context ) => context.response.body = render( await UserDataRoute(context)))


function redirectNonFrame (
    context : Context ,
    next : () => Promise<any>
){

    if( context.request.headers.get('sec-fetch-dest') === 'iframe' )
        return next()

    if( context.request.url.pathname === '/' )
        return

    context.response.redirect('/')
}

function onlyDocument (
    context : Context ,
    next : () => Promise<any>
){

    if( context.request.headers.get('sec-fetch-dest') === 'document' )
        return next()

    context.response.status = 500
}



const Reactions = new Map
Reactions.set(crypto.randomUUID(),'1')
Reactions.set(crypto.randomUUID(),'2')
Reactions.set(crypto.randomUUID(),'3')
Reactions.set(crypto.randomUUID(),'4')
Reactions.set(crypto.randomUUID(),'5')


router.get('/Chat/React',onlyLoggedIn,routeChatReact)


const database = await Deno.openKv('./Database/Storage.db');


const nick = 'Uwdmin'
const test_account = await createAccount()
console.debug(`Test Account`,test_account)

await database.set([ 'User_By_Id' , test_account.userId ],{ nick })



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

