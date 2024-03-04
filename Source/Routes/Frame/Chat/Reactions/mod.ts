
export { middleware as serveReactions }

import { DynamicFrame } from 'Framework'
import { WithSession } from '../../../State.ts'
import { Page } from './Page.tsx'
import { Context } from 'Oak'



async function middleware (
    context : Context<WithSession>
){
    DynamicFrame({

        context ,

        frameId : 'reactions_window' ,

        children : Page()
    })
}
