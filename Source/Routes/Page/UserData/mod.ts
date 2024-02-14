
export { middleware as routeUserData }

import { UserDataRoute } from './Form.tsx'
import { Context } from 'Oak'
import { render } from 'Render'
import { WithSession } from "../../State.ts";


async function middleware (
    context : Context<WithSession>
){

    const html = render( await UserDataRoute(context) )

    context.response.body = html
}
