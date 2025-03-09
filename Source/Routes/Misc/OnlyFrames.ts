
export { onlyFrames }

import { Context } from 'Oak'
import { Pages } from 'Misc'


function onlyFrames (
    context : Context ,
    next : () => Promise<any>
){

    const { response , request } = context

    const destination = request.headers.get('sec-fetch-dest')

    const inIFrame = ( destination === 'iframe' )

    if( inIFrame )
        return next()

    if( request.url.pathname === '/' )
        return

    response.redirect(Pages.Home)
}
