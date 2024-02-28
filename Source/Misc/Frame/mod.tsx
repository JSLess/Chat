
export type { Props as FrameProps }
export { Frame }

import { ComponentChildren } from 'Preact'
import { AsyncResponse } from 'Misc/Async'
import { Session } from '../Types.ts'
import { Context } from 'Oak'
import { render } from 'Render'


interface Props {
    frameId : keyof Session['frames']
    page : ( context : Context ) => ComponentChildren | Promise<ComponentChildren>
}


function Frame ( props : Props ){

    const { frameId } = props

    return async ( context : Context ) => {

        const { response , state } = context

        const children = await props.page(context)

        const html = render(
            <html children = { children } />
        )


        const { headers } = response
        headers.set('Content-Type','text/html;charset=utf-8')
        headers.set('Transfer-Encoding','chunked')
        headers.set('Connection','keep-alive')
        headers.set('Keep-Alive',`timeout=${ 60 * 60 }`)


        const frame = new AsyncResponse
        response.body = frame.readable
        state.session.frames[ frameId ] = frame
        frame.write(html)
    }
}
