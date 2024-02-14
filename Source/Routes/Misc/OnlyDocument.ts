
export { middleware as onlyDocument }

import { Context } from 'Oak'


function middleware (
    context : Context ,
    next : () => Promise<any>
){

    const { response , request } = context

    const destination = request.headers.get('sec-fetch-dest')

    const inDocument = ( destination === 'document' )

    if( inDocument )
        return next()

    response.status = 500
}
