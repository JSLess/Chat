
export { routeAsset }

import { Context } from 'Oak'
import { Status } from 'Misc'


const root = `${ Deno.cwd() }/Source/Static`


async function routeAsset ( 
    context : Context 
){

    const { response , request } = context
    const { pathname } = request.url


    const path = pathname
        .replace(/^\/Asset\//,'')

    await context
    .send({ root , path })
    .catch(() => {
        response.status = Status.NotFound
    })
}
