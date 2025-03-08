
export { routeFrame }

import { LogoutFrame } from './Frame.tsx'
import { Context } from 'Oak'
import { render } from 'Render'


async function routeFrame ( context : Context ){
    context.response.body = render(LogoutFrame())
}
