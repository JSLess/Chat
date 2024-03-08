
export {
    Reference as RegisterForm ,
    router as register_form_router
}

import { initState , determineCookies , determineSession } from '../../Routes/mod.ts'
import { IFrameReference , routeStyle } from 'Framework'
import { onlyWithCookies } from 'Misc/Routes'
import { onlyFrames } from '../../Routes/Misc/OnlyFrames.ts'
import { routeFrame } from './Component/mod.ts'
import { routeAPI } from './API/Register.ts'
import { Router } from 'Oak'


const router = new Router
router.post('/API/RegisterForm',initState,determineSession,determineCookies,onlyWithCookies,routeAPI)
router.get('/Frame/RegisterForm',onlyFrames,initState,determineSession,determineCookies,onlyWithCookies,routeFrame)
router.get('/Asset/Styles/RegisterForm.css',... routeStyle({ meta : import.meta , file : 'Style.css' }))


const Reference = IFrameReference({ name : 'RegisterForm' })
