
export { middleware as serveEmoticons }

import { Frame } from 'Misc/Frame'
import { Page } from './Page.tsx'


const middleware = Frame({

    frameId : 'reactions_emoticons' ,

    page : Page
})
