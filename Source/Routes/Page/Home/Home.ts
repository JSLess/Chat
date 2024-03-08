
export { middleware as routeHome }

import { BaseState, WithSession } from '../../State.ts'
import { DynamicFrame } from '../../../Framework/DynamicFrame.tsx'
import { Context } from 'Oak'
import { render } from 'Render'
import { Page } from './Page.tsx'


async function middleware (
    context : Context<BaseState>
){

    const { state } = context

    const children = await Page(context.state)

    if( state.hasSession ){

        DynamicFrame({
            children , context : context as Context<WithSession> ,
            frameId : 'home'
        })

    } else {
        context.response.body = render(children)
    }
}
