
export type { Args as FrameArgs }
export { Frame }

import { FrameContext } from 'Framework'
import { encodeBase64 } from 'Encoding'
import { Isolate } from '../../Wrapped/Isolate.tsx'
import { Session } from '../../Misc/Types.ts'
import { Content } from './Content.tsx';


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

    const { style , slug } = context

    return (
        <div class = 'Button' >

            <img src = { uri } />

            <Isolate>
                <Content
                    style = { style }
                    slug = { slug }
                    uuid = { args.uuid }
                />
            </Isolate>

        </div>
    )
}
