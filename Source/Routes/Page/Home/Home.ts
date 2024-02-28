
export { middleware as routeHome }

import { Context } from 'Oak'
import { render } from 'Render'
import { Page } from './Page.tsx'
import { BaseState } from "../../State.ts";
import { sessions } from "State";
import { AsyncResponse } from "Misc/Async";


async function middleware (
    context : Context<BaseState>
){


    const { response , state } = context

    const html = render(await Page(context.state))

    if( state.hasSession ){

        const session = sessions
            .get(state.sessionId)!

        const { headers } = response

        headers.set('Content-Type','text/html;charset=utf-8')
        headers.set('Transfer-Encoding','chunked')
        headers.set('Connection','keep-alive')
        headers.set('Keep-Alive',`timeout=${ 60 * 60 }`)

        session.home = new AsyncResponse

        response.body = session.home.readable
        session.home.write(html)

    } else {
        context.response.body = html
    }
}
