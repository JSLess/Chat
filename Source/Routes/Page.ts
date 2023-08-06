
export { routeHome }

import { WithSession } from './Session.ts'
import { Context } from 'Oak'
import { render } from 'Render'
import { Page } from '../Frames/Page.tsx'


async function routeHome (
    context : Context<WithSession>
){

    const { loggedIn } = context.state

    context.response.body =
        render(Page({ loggedIn }))
}
