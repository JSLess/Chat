
export { route }

import { MessagesStyle } from '../../Routes/Frame/Chat/Message/List/Messages.tsx'
import { MessageStyle } from '../../Routes/Frame/Chat/Message/List/Message.tsx'

import { Context } from 'Oak'
import { Status } from 'Misc'


const Pattern = /^\/([-_A-z0-9]+\/)*[-_A-z0-9]+\.[a-z]+$/

const notice = `
    Check the GitHub repository for this asset at:
    https://github.com/JSLess/Chat/tree/Stable/Source/Static
`

const root = `${ Deno.cwd() }/Source/Static`


const Dict = {
    '/Asset/Styles/Messages.css' : MessagesStyle ,
    '/Asset/Styles/Message.css' : MessageStyle
} as Record<string,string>


async function route (
    context : Context
){
    const { response , request } = context

    // console.debug('Routing Asset',request.url)

    const referer = request.headers.get('referer')

    if( ! referer ){
        response.status = Status.MisdirectedRequest
        response.body = notice
        return
    }

    try {

        const url = new URL(referer)

        if( url.host !== context.request.url.host ){
            response.status = Status.MisdirectedRequest
            response.body = notice
            return
        }

    } catch {
        response.status = Status.BadRequest
        response.body = `Malformed Referer`
        return
    }

    const { pathname } = request.url

    if( ! Pattern.test(pathname) ){
        response.status = Status.Forbidden
        return
    }

    if( pathname in Dict ){
        response.headers.set('Content-Type','text/css')
        response.body = Dict[ pathname ]
        return
    }

    const path = pathname.slice(6)

    await context
        .send({ root , path })
        .catch(() => {
            response.status = Status.NotFound
        })
}
