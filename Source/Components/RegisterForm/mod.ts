
export {
    RegisterForm ,
    register_form_router
}

import { initState , determineCookies , determineSession } from '../../Routes/mod.ts'
import { onlyWithCookies } from 'Misc/Routes'
import { IFrameReference } from 'Framework'
import { onlyFrames } from '../../Routes/Misc/OnlyFrames.ts'
import { routeFrame } from './Component/mod.ts'
import { routeAPI } from './API/Register.ts'
import { Router } from 'Oak'


const router = new Router
router.post('/API/RegisterForm',initState,determineSession,determineCookies,onlyWithCookies,routeAPI)
router.get('/Frame/RegisterForm',onlyFrames,initState,determineSession,determineCookies,onlyWithCookies,routeFrame)

const register_form_router = router


const RegisterForm = IFrameReference({ 
    name : 'RegisterForm'
})
