
export { routeLogout }

import { Context } from 'Oak'
import { render } from 'Render'
import { Logout } from '../../Frames/Logout.tsx'


async function routeLogout ( context : Context ){

    // console.log('Logout Interface',context.request.headers.get('sec-fetch-dest'))

    context.response.body = render(Logout())
}
