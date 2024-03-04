
export type { Props as FrameProps }
export { Component as DynamicFrame }

import { ComponentChildren } from 'Preact'
import { AsyncResponse } from 'Misc/Async'
import { Session } from '../Misc/Types.ts'
import { Context } from 'Oak'
import { render } from 'Render'
import { WithSession } from "../Routes/State.ts";


interface Props {
    children : ComponentChildren
    context : Context<WithSession>
    frameId : keyof Session['frames']
}


function Component ( props : Props ){

    const { context , frameId , children } = props

    const { response , state } = context


    const html = render(
        <html children = { children } />
    )


    const { headers } = response
    headers.set('Content-Type','text/html;charset=utf-8')
    headers.set('Connection','keep-alive')
    headers.set('Keep-Alive',`timeout=${ 60 * 60 }`)


    const frame = new AsyncResponse
    response.body = frame.readable
    state.session.frames[ frameId ] = frame
    frame.write(html)
}
