
export type { Args as FrameArgs }
export { Frame }

import { FrameContext } from 'Framework'
import { Session } from '../../Misc/Types.ts'


interface Args {

    onClick :
        ( args : { session : Session } ) => void

    icon : string
}


const Frame =
    ( context : FrameContext ) =>
    ( args : Args ) => {

    const { references , slug } = context

    const uuid = crypto.randomUUID()

    references.set(uuid,{ args , uuid })

    console.debug('References',references)

    const icon = `/Asset/Icons/${ args.icon }.webp`

    const search = new URLSearchParams({
        Type : slug ,
        Ref : uuid
    })

    const src = `/Frame?${ search.toString() }`

    return (
        <div class = 'Button' >

            <img src = { icon } />

            <iframe src = { src } />

        </div>
    )
}
