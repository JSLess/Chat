
export { onlyDocument }

import { Context } from 'Oak'
import { Status } from 'Misc'


function onlyDocument (
    context : Context ,
    next : () => Promise<any>
){

    const { response , request } = context

    const destination = request.headers.get('sec-fetch-dest')

    const inDocument = ( destination === 'document' )

    if( inDocument )
        return next()

    response.status = Status.InternalServerError
}
