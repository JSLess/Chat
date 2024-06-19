
export type { Args as FrameArgs }
export { Frame }

import { FrameContext, Parameters } from 'Framework'
import { Session } from '../../Misc/Types.ts'
import { render } from 'Render';


interface Args {

    onClick :
        ( args : { session : Session } ) => void

    icon : string
    uuid : string
}


const Frame =
    ( context : FrameContext ) =>
    ( args : Args ) => {

    const icon = `/Asset/Icons/${ args.icon }.webp`

    const { content , style , slug } = context

    return (
        <div class = 'Button' >

            <img src = { icon } />

            <iframe srcDoc = { render(content({ ... args , style , slug })) } />

        </div>
    )
}
