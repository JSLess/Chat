
export type { Args as FrameArgs }
export { Frame }

import { references , internal } from './Internal.tsx'


interface Args {
    onClick : () => void
    icon : string
}


function Frame (
    args : Args
){

    const uuid = crypto.randomUUID()

    references.set(uuid,{ args , uuid })

    const icon = `/Asset/Icons/${ args.icon }.webp`

    const search = new URLSearchParams({
        Type : internal.frameId ,
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
