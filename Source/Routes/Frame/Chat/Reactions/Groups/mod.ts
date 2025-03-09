
export { serveGroups }

import { DynamicFrame } from 'Framework'
import { WithSession } from 'Routes/State'
import { Context } from 'Oak'
import { Page } from './Page.tsx'


async function serveGroups (
    context : Context<WithSession>
){

    DynamicFrame({
        children : Page() ,
        frameId : 'reactions_groups' ,
        context : context
    })
}
