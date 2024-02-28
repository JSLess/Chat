
export { middleware as serveGroups }

import { Frame } from 'Misc/Frame'
import { Page } from './Page.tsx'


const middleware = Frame({

    frameId : 'reactions_groups' ,

    page : Page
})
