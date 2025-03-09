
export { middleware as serveReactions }

import { DynamicFrame } from 'Framework'
import { WithSession } from 'Routes/State'
import { Context } from 'Oak'
import { Page } from './Page.tsx'


async function middleware (
    context : Context<WithSession>
){
    DynamicFrame({
        children : Page() ,
        frameId : 'reactions_window' ,
        context : context
    })
}
