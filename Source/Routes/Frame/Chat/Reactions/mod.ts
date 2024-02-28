
export { middleware as serveReactions }

import { Frame } from 'Misc/Frame'
import { Page } from './Page.tsx'


const middleware = Frame({

    frameId : 'reactions_window' ,

    page : Page
})
