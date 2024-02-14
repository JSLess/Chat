
export { middleware as withValidPath }

import { Context } from 'Oak'


const Pattern = /^\/Asset\/([-_A-z0-9]+\/)*[-_A-z0-9]+\.[a-z]+$/


function middleware (
    context : Context ,
    next : () => Promise<any>
){

    const { response , request } = context
    const { pathname } = request.url

    if( Pattern.test(pathname) )
        return next()

    response.status = 403
}
