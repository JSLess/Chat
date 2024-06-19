
export type { Args as FrameArgs }
export { Frame }

import { FrameContext, Parameters } from 'Framework'
import { Session } from '../../Misc/Types.ts'
import { render } from 'Render';


import { encodeBase64 } from "https://deno.land/std@0.224.0/encoding/base64.ts";

const buffer = await Deno.readFile(`./Source/Static/Icons/Reaction.webp`)

const uri = `data:image/webp;base64,${ encodeBase64(buffer) }`



interface Args {

    onClick :
        ( args : { session : Session } ) => void

    icon : string
    uuid : string
}


const Frame =
    ( context : FrameContext ) =>
    ( args : Args ) => {

    // const icon = `/Asset/Icons/${ args.icon }.webp`

    const { content , style , slug } = context

    return (
        <div class = 'Button' >

            <img src = { uri } />

            <iframe srcDoc = { render(content({ ... args , style , slug })) } />

        </div>
    )
}
