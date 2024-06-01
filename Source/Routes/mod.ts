
export { router }


export { initState , checkCookies , determineCookies , determineSession , recheckCookies }

import {
    setupMessageInputForm ,
    setupRegisterForm ,
    setupLogoutForm ,
    setupLoginForm ,
    setupErrorLog
} from 'UI/Parts'

import {
    determineSession , determineCookies , onlyWithCookies , initState ,
    recheckCookies , onlyDocument , checkCookies , onlyFrames
} from 'Misc/Routes'

import { message_input_form_router , register_form_router , logout_form_router , login_form_router, error_log_router } from 'UI/Parts'
import { onlyWithCookies } from 'Misc/Routes'
import { Context, Router } from 'Oak'
import { onlyDocument } from './Misc/OnlyDocument.ts'
import { onlyFrames } from './Misc/OnlyFrames.ts'
import { routeHome } from './Page/Home/Home.ts'
import { BaseState } from './State.ts'
import { setCookie } from 'HTTP'
import { sessions } from 'State'
import { frame } from './Frame/mod.ts'
import { asset } from './Asset/mod.ts'
import { page } from './Page/mod.ts'
import { api } from './API/mod.ts'


const router = new Router

router.use(register_form_router.routes())
router.use(register_form_router.allowedMethods())

router.use(logout_form_router.routes())
router.use(logout_form_router.allowedMethods())

router.use(login_form_router.routes())
router.use(login_form_router.allowedMethods())

router.use(error_log_router.routes())
router.use(error_log_router.allowedMethods())

router.use(message_input_form_router.routes())
router.use(message_input_form_router.allowedMethods())

router.get('/',onlyDocument,checkCookies,initState,determineSession,determineCookies,recheckCookies,routeHome)

router.get('/Asset',asset.routes())

router.use('/Frame',onlyFrames,initState,determineSession,determineCookies,onlyWithCookies,frame.routes())
router.use('/Page',onlyDocument,checkCookies,initState,determineSession,determineCookies,recheckCookies,page.routes())
router.use('/API',initState,determineSession,determineCookies,onlyWithCookies,api.routes())


async function checkCookies (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    if( context.request.url.searchParams.has('CheckCookie') ){

        if( await context.cookies.size ){
            const url = context.request.url
            url.searchParams.delete('NoCookie')
            url.searchParams.delete('CheckCookie')
            context.response.redirect(url)
            return
        }

        const url = context.request.url
        url.searchParams.delete('CheckCookie')
        url.searchParams.set('NoCookie','')
        context.response.redirect(url)
        return
    }

    return await next()
}
