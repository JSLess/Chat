
export type { WithSession }
export { validateSession }

import { Context , Next } from 'Oak'
import { CookieNotice } from '../Frames/CookieNotice.tsx'
import { sessions } from '../State.ts'
import { render } from 'Render'

import Favicon from '../Components/Favicon.ts'


interface WithSession {
    sessionId : string
    loggedIn : boolean
}


async function validateSession (
    context : Context<WithSession> ,
    next : Next
){

    const { response , cookies , request , state } = context
    const { pathname } = request.url


    if( pathname.startsWith('/Assets/') )
        return await next()


    const path = request.url.pathname

    const isCookieCheck = ( path === '/Cookie' )

    if( path === '/Cookie/Notice' ){

        if( await cookies.has('Session') ){
            console.log('Redirecting back to home')
            response.redirect(request.url.searchParams.get('ReturnTo') || '/')
            return
        }


        return await next()
    }

    if( isCookieCheck ){

        if( await cookies.has('Session') ){
            console.log('Redirecting back to home')
            response.redirect(request.url.searchParams.get('ReturnTo') || '/')
            return
        }

        context.response.redirect('/Cookie/Notice')

        return

    } else {

        let sessionId = await cookies.get('Session')

        if( sessionId ){

            const session = sessions.get(sessionId)

            if( session ){

                const loggedIn = !! session.accountId

                // console.log(pathname,sessionId,session,loggedIn)

                state.sessionId = sessionId
                state.loggedIn = loggedIn

                await next()

                return
            }
        }

        console.log('Trying to set session cookie',sessionId)

        sessionId = crypto.randomUUID()

        await cookies.set('Session',sessionId)
        sessions.set(sessionId,{
            sessionIds : []
        })

        let url = '/Cookie'

        if( path !== '/' )
            url += `?ReturnTo=${ encodeURIComponent(path) }`

        response.redirect(url)
        return
    }
}


