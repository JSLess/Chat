
export { routeHome }

import { WithSession } from './Session.ts'
import { Context } from 'Oak'
import { render } from 'Render'
import { Page } from '../Frames/Page.tsx'


async function routeHome (
    context : Context<WithSession>
){

    const { loggedIn } = context.state

    let html = render(Page({ loggedIn }))

    if( context.state.loggedIn )
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
