
export { routeLogout }

import { Context } from 'Oak'
import { render } from 'Render'
import { Logout } from '../../Frames/Logout.tsx'


async function routeLogout ( context : Context ){
    context.response.body = render(Logout())
}
