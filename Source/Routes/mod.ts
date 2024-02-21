
export { router }
export { onlySessions }

import { BaseState, WithSession } from './State.ts'
import { Context, Router } from 'Oak'
import { onlyDocument } from './Misc/OnlyDocument.ts'
import { onlyFrames } from "./Misc/OnlyFrames.ts";
import { routeHome } from './Page/Home/Home.ts'
import { setCookie } from 'HTTP'
import { sessions } from 'State'
import { frame } from './Frame/mod.ts'
import { asset } from './Asset/mod.ts'
import { page } from './Page/mod.ts'
import { api } from './API/mod.ts'


const router = new Router

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


function initState (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    context.state = {
        hasCookies : 'Unknown' ,
        hasSession : false
    }

    return next()
}

async function determineSession (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    const sessionId = await context.cookies.get('Session')

    if( ! sessionId )
        return await next()

    /*
     * No need to check if it's a proper UUID
     * only if it contains valid chars.
     */

    if( ! /^[-0-9A-F]{36}$/i.test(sessionId) )
        return await next()

    const session = sessions.get(sessionId)

    if( ! session )
        return await next()

    context.state = {
        ... context.state ,
        hasSession : true ,
        sessionId : sessionId ,
        session : session
    }

    return await next()
}

async function determineCookies (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    if( context.state.hasSession )
        context.state.hasCookies = 'Enabled'

    if( context.request.url.searchParams.has('NoCookies') )
        context.state.hasCookies = 'Disabled'

    if( await context.cookies.size )
        context.state.hasCookies = 'Enabled'

    return await next()
}

function recheckCookies (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    if( context.state.hasCookies === 'Unknown' ){

        setCookie(context.response.headers,{
            name : 'CheckCookie' ,
            value : 'Dummy' ,
            path : '/' ,
            httpOnly : true ,
            secure : false ,
            sameSite : 'Lax' ,
            expires : new Date(Date.now() + 1000 * 10)
        })

        const url = context.request.url
        url.searchParams.set('CheckCookie','')
        context.response.redirect(url)

        return
    }

    return next()
}


function onlySessions (
    context : Context<WithSession> ,
    next : () => Promise<any>
){

    if( context.state.hasSession )
        return next()

    context.response.status = 403
}

function onlyWithCookies (
    context : Context<BaseState> ,
    next : () => Promise<any>
){

    if( context.state.hasCookies === 'Enabled' )
        return next()

    context.response.status = 403
}

