
export {
    Reference as LoginForm ,
    router as login_form_router
}

import { initState , determineCookies , determineSession } from '../../Routes/mod.ts'
import { IFrameReference , routeStyle } from 'Framework'
import { validateCredentials } from './API/Validate.tsx'
import { onlyWithCookies } from 'Misc/Routes'
import { onlyFrames } from '../../Routes/Misc/OnlyFrames.ts'
import { routeFrame } from './Component/Frame.tsx'
import { routeAPI } from './API/Login.ts'
import { Router } from 'Oak'


const router = new Router
router.post('/API/LoginForm',initState,determineSession,determineCookies,onlyWithCookies,validateCredentials,routeAPI)
router.get('/Frame/LoginForm',onlyFrames,initState,determineSession,determineCookies,onlyWithCookies,routeFrame)
router.get('/Asset/Styles/LoginForm.css',... routeStyle({ meta : import.meta , file : 'Style.css' }))


const Reference = IFrameReference({ name : 'LoginForm' })
