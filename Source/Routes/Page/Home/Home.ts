
export { middleware as routeHome }

import { Context } from 'Oak'
import { render } from 'Render'
import { Page } from './Page.tsx'
import { BaseState, WithSession } from "../../State.ts";
import { sessions } from "State";
import { AsyncResponse } from "Misc/Async";
import { DynamicFrame } from "../../../Framework/DynamicFrame.tsx";


async function middleware (
    context : Context<BaseState>
){


    const { response , state } = context

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
