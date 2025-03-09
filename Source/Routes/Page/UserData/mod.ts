
export { routeUserData }

import { UserDataRoute } from './Form.tsx'
import { WithSession } from 'Routes/State'
import { Context } from 'Oak'
import { render } from 'Render'


async function routeUserData (
    context : Context<WithSession>
){

    const element = await UserDataRoute(context)

    const html = render(element)

    context.response.body = html
}
