
export type { FrameArgs }
export { Frame }

import { FrameContext } from 'Framework'
import { Isolate } from '../../Wrapped/Isolate.tsx'
import { Content } from './Content.tsx'
import { Session } from 'Misc/Types'
import { Icon } from 'UI/Parts'
import { Stylesheet } from 'Misc';


interface FrameArgs {

    onClick : ( args : { session : Session } ) => void

    icon : string
    uuid : string
}


const Frame = 
    ( { style , slug } : FrameContext ) =>
    ( { icon , uuid } : FrameArgs ) => (

        <div class = 'Button' >

            <Stylesheet path = 'Button' />

            <Icon name = { icon } />

            <Isolate>
                <Content
                    style = { style }
                    uuid = { uuid }
                    slug = { slug }
                />
            </Isolate>

        </div>
    )