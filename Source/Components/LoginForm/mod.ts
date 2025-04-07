
export { login_form_router , LoginForm }

import { initState , determineCookies , determineSession } from 'Routes'
import { validateCredentials } from './API/Validate.tsx'
import { IFrameReference } from 'Framework'
import { onlyWithCookies } from 'Misc/Routes'
import { onlyFrames } from '../../Routes/Misc/OnlyFrames.ts'
import { routeFrame } from './Component/Frame.tsx'
import { routeAPI } from './API/Login.ts'
import { Router } from 'Oak'


const router = new Router
router.post('/API/LoginForm',initState,determineSession,determineCookies,onlyWithCookies,validateCredentials,routeAPI)
router.get('/Frame/LoginForm',onlyFrames,initState,determineSession,determineCookies,onlyWithCookies,routeFrame)

const login_form_router = router


const LoginForm = IFrameReference({ 
    name : 'LoginForm' 
})
