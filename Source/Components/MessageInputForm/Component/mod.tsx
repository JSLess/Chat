
export { routeFrame }

import { InputFrame } from './Input.tsx'
import { Context } from 'Oak'
import { render } from 'Render'


async function routeFrame (
    context : Context
){
    context.response.body = render(InputFrame())
}
