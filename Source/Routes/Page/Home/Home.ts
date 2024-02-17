
export { middleware as routeHome }

import { Context } from 'Oak'
import { render } from 'Render'
import { Page } from './Page.tsx'
import { BaseState } from "../../State.ts";


async function middleware (
    context : Context<BaseState>
){

    let html = render(await Page(context.state))

    if( context.state.hasSession )
        html += `

            <style>

                #Chatting {

                    grid-template-columns : 4fr 1fr ;
                    display : grid ;
                    gap : 2rem ;
                }

            </style>
        `

    context.response.body = html
}
