
export { onlyAllowDocuments }

import { Headers , Status } from 'Misc'
import { Context } from 'Oak'


/**
 *  Only allow the client to continue if 
 *  they are trying to request a document.
 */

function onlyAllowDocuments (
    context : Context ,
    next : () => Promise<any>
){
    
    const { response , request } = context

    const destination = request.headers
        .get(Headers.Fetched_Data_Destination)

    if( destination === 'document' )
        return next()

    response.status = Status.NotAcceptable
}
