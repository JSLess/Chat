
export {
    Reference as LoginForm ,
    router as login_form_router
}

import { initState , determineCookies , determineSession , onlyWithCookies } from '../../Routes/mod.ts'
import { IFrameReference , routeStyle } from 'Framework'
import { onlyFrames } from '../../Routes/Misc/OnlyFrames.ts'
import { routeFrame } from './Component/mod.tsx'
import { Router } from 'Oak'


const router = new Router
router.get('/Asset/Styles/LoginForm.css',... routeStyle({ meta : import.meta , file : 'Style.css' }))
router.get('/Frame/LoginForm',onlyFrames,initState,determineSession,determineCookies,onlyWithCookies,routeFrame)


const Reference = IFrameReference({ name : 'LoginForm' })


