
export { routeAsset }

import { Context } from 'Oak'


const root = `${ Deno.cwd() }/Source/Static`


async function routeAsset ( context : Context ){

    const { response , request } = context
    const { pathname } = request.url

    const path = pathname
        .replace(/^\/Assets\//,'')

    try {

        await context.send({ root , path })

    } catch {
        response.status = 404
    }
}
