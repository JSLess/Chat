
export type { FrameArgs }
export { Frame }

import { FrameContext } from 'Framework'
import { Stylesheet } from 'Misc'
import { Isolate } from '../../Wrapped/Isolate.tsx'
import { Content } from './Content.tsx'
import { Session } from 'Misc/Types'
import { Icon } from 'UI/Parts'


interface FrameArgs {

    onClick : ( args : { session : Session } ) => void

    icon : string
    uuid : string
}


const Frame = 
    ( { style , sheet , slug } : FrameContext ) =>
    ( { icon , uuid } : FrameArgs ) => (

        <div class = 'Button' >
            <template { ... { shadowrootmode : 'open' } } >

                <Stylesheet path = 'Button' />

                <Icon name = { icon } />

                <Isolate>
                    <Content
                        sheet = { sheet }
                        style = { style }
                        uuid = { uuid }
                        slug = { slug }
                    />
                </Isolate>

            </template>
        </div>
    )