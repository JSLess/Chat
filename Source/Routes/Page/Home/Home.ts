
export { middleware as routeHome }

import { WithSession , BaseState } from 'Routes/State'
import { DynamicFrame } from 'Framework'
import { Context } from 'Oak'
import { render } from 'Render'
import { Page } from './Page.tsx'


async function middleware (
    context : Context<BaseState>
){

    const { response , state } = context

    const children = await Page(context.state)

    if( state.hasSession ){

        DynamicFrame({
            children , 
            context : context as Context<WithSession> ,
            frameId : 'home'
        })

    } else {
        response.body = render(children)
    }
}
