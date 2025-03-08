
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


const Duration_1_Hour = 60 * 60


/**
 *  Creates a long term connection,
 *  registers the frame in the session
 *  and sends the rendered items off.
 */

function Component (
    props : Props
){

    const { children , context , frameId } = props
    const { response , state } = context


    const { headers } = response
    headers.set('Content-Type','text/html;charset=utf-8')
    headers.set('Connection','keep-alive')
    headers.set('Keep-Alive',`timeout=${ Duration_1_Hour }`)


    const frame = new AsyncResponse
    response.body = frame.readable

    state.session.frames[ frameId ] = frame


    const fragment = Fragment({ children })!

    const html = render(fragment)

    frame.write(html)
}
