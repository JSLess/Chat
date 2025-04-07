
export { message_input_form_router , MessageInputForm }

import { initState , determineCookies , determineSession } from 'Routes'
import { onlyWithCookies , onlySessions } from 'Misc/Routes'
import { onlyAuthenticated } from '../../Routes/Misc/OnlyAuthenticated.ts'
import { IFrameReference } from 'Framework'
import { onlyFrames } from '../../Routes/Misc/OnlyFrames.ts'
import { routeFrame } from './Component/mod.tsx'
import { routeSend } from './API/Send.ts'
import { Router } from 'Oak'


const router = new Router
router.post('/API/MessageInputForm',initState,determineSession,determineCookies,onlyWithCookies,onlySessions,onlyAuthenticated,routeSend)
router.get('/Frame/MessageInputForm',onlyFrames,initState,determineSession,determineCookies,onlyWithCookies,routeFrame)

const message_input_form_router = router


const MessageInputForm = IFrameReference({ 
    name : 'MessageInputForm' 
})
