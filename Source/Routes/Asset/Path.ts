
export { withValidPath }

import { Context } from 'Oak'
import { Status } from 'Misc'


const Pattern = /^\/Asset\/([-_A-z0-9]+\/)*[-_A-z0-9]+\.[a-z]+$/


function withValidPath (
    context : Context ,
    next : () => Promise<any>
){

    const { response , request } = context
    const { pathname } = request.url

    if( Pattern.test(pathname) )
        return next()

    response.status = Status.Forbidden
}
