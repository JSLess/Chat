
export type { Args as FrameArgs }
export { Frame }

import { FrameContext, Parameters } from 'Framework'
import { Session } from '../../Misc/Types.ts'


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

    const { slug , uuid } = context

    const search = new URLSearchParams({
        [ Parameters.Reference ] : uuid ,
        [ Parameters.Frame ] : slug
    })

    const src = `/Frame?${ search.toString() }`

    return (
        <div class = 'Button' >

            <img src = { icon } />

            <iframe src = { src } />

        </div>
    )
}
