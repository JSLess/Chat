
export { middleware as serveEmoticons }

import { DynamicFrame } from 'Framework'
import { WithSession } from '../../../../State.ts'
import { Context } from 'Oak'
import { Page } from './Page.tsx'


async function middleware (
    context : Context<WithSession>
){
    DynamicFrame({

        context ,

        frameId : 'reactions_emoticons' ,

        children : Page(context)
    })
}
