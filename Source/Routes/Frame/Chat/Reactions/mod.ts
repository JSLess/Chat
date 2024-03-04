
export { middleware as serveReactions }

import { DynamicFrame } from 'Framework'
import { WithSession } from '../../../State.ts'
import { Context } from 'Oak'
import { Page } from './Page.tsx'



async function middleware (
    context : Context<WithSession>
){
    DynamicFrame({

        context ,

        frameId : 'reactions_window' ,

        children : Page()
    })
}
