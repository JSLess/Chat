
export { middleware as routeFrame }

import { Context } from 'Oak'
import { render } from 'Render'
import { Input } from './Input.tsx'


async function middleware (
    context : Context
){
    context.response.body = render(Input())
}
