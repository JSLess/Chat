
export { serveEmoticons }

import { DynamicFrame } from 'Framework'
import { WithSession } from 'Routes/State'
import { Context } from 'Oak'
import { Page } from './Page.tsx'


async function serveEmoticons (
    context : Context<WithSession>
){
    DynamicFrame({
        children : Page(context) ,
        frameId : 'reactions_emoticons' ,
        context : context 
    })
}
