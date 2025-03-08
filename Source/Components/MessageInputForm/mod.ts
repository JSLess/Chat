
export { message_input_form_router , MessageInputForm }

import { initState , determineCookies , determineSession } from 'Routes'
import { onlyWithCookies , onlySessions } from 'Misc/Routes'
import { IFrameReference , routeStyle } from 'Framework'
import { onlyAuthenticated } from '../../Routes/Misc/OnlyAuthenticated.ts'
import { onlyFrames } from '../../Routes/Misc/OnlyFrames.ts'
import { routeFrame } from './Component/mod.tsx'
import { routeSend } from './API/Send.ts'
import { Router } from 'Oak'


const router = new Router
router.post('/API/MessageInputForm',initState,determineSession,determineCookies,onlyWithCookies,onlySessions,onlyAuthenticated,routeSend)
router.get('/Frame/MessageInputForm',onlyFrames,initState,determineSession,determineCookies,onlyWithCookies,routeFrame)
router.get('/Asset/Styles/MessageInputForm.css',... routeStyle({ meta : import.meta , file : 'Style.css' }))

const message_input_form_router = router


const MessageInputForm = IFrameReference({ 
    name : 'MessageInputForm' 
})
