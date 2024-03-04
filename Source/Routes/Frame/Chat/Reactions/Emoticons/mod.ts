
export { middleware as serveEmoticons }

import { DynamicFrame } from 'Framework'
import { Page } from './Page.tsx'
import { Context } from 'Oak'
import { WithSession } from "../../../../State.ts";



async function middleware (
    context : Context<WithSession>
){
    DynamicFrame({

        context ,

        frameId : 'reactions_emoticons' ,

        children : Page(context)
    })
}
