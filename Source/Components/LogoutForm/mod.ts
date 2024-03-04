
export {
    Reference as LogoutForm ,
    router as logout_form_router
}

import { initState , determineCookies , determineSession , onlyWithCookies } from '../../Routes/mod.ts'
import { IFrameReference , routeStyle } from 'Framework'
import { onlyFrames } from '../../Routes/Misc/OnlyFrames.ts'
import { routeFrame } from './Component/mod.ts'
import { routeAPI } from './API/Logout.ts'
import { Router } from 'Oak'


const router = new Router
router.post('/API/LogoutForm',initState,determineSession,determineCookies,onlyWithCookies,routeAPI)
router.get('/Frame/LogoutForm',onlyFrames,initState,determineSession,determineCookies,onlyWithCookies,routeFrame)
router.get('/Asset/Styles/LogoutForm.css',... routeStyle({ meta : import.meta , file : 'Style.css' }))


const Reference = IFrameReference({ name : 'LogoutForm' })
