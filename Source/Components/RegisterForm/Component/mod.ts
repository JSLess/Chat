
export { middleware as routeFrame }

import { Context } from 'Oak'
import { render } from 'Render'
import { Frame } from './Frame.tsx'


async function middleware ( context : Context ){
    context.response.body = render(Frame())
}
