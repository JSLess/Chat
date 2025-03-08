
export { middleware as routeFrame }

import { RegisterFrame } from './Frame.tsx'
import { Context } from 'Oak'
import { render } from 'Render'


async function middleware ( 
    { response } : Context 
){
    response.body = render(RegisterFrame())
}
