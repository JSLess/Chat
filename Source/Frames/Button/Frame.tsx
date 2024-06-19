
export type { Args as FrameArgs }
export { Frame }

import { FrameContext } from 'Framework'
import { encodeBase64 } from 'Encoding'
import { Isolate } from '../../Wrapped/Isolate.tsx'
import { Session } from '../../Misc/Types.ts'
import { Content } from './Content.tsx';


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

    const path = `./Source/Static/Icons/${ args.icon }.webp`

    const buffer = Deno.readFileSync(path)

    const uri = `data:image/webp;base64,${ encodeBase64(buffer) }`

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
