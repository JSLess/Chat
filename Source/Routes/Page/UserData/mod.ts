
export { middleware as routeUserData }

import { UserDataRoute } from './Form.tsx'
import { WithSession } from '../../State.ts'
import { Context } from 'Oak'
import { render } from 'Render'


async function middleware (
    context : Context<WithSession>
){

    const html = render( await UserDataRoute(context) )

    context.response.body = html
}
