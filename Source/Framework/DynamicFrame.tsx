
export type { Props as FrameProps }
export { Component as DynamicFrame }

import { ComponentChildren, Fragment } from 'preact'
import { AsyncResponse } from 'Misc/Async'
import { WithSession } from '../Routes/State.ts'
import { Session } from '../Misc/Types.ts'
import { Context } from 'Oak'
import { render } from 'Render'


interface Props {
    children : ComponentChildren
    context : Context<WithSession>
    frameId : keyof Session['frames']
}


function Component (
    props : Props
){

    const { context , frameId , children } = props

    const { response , state } = context

    const wrapper = Fragment({ children })!

    const html = render(wrapper)


    const { headers } = response
    headers.set('Content-Type','text/html;charset=utf-8')
    headers.set('Connection','keep-alive')
    headers.set('Keep-Alive',`timeout=${ 60 * 60 }`)


    const frame = new AsyncResponse
    response.body = frame.readable
    state.session.frames[ frameId ] = frame
    frame.write(html)
}
