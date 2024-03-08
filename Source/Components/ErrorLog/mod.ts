
export {
    Reference as ErrorLog ,
    router as error_log_router
}


import { initState , determineCookies , determineSession } from '../../Routes/mod.ts'
import { IFrameReference , routeStyle } from 'Framework'
import { onlyWithCookies } from 'Misc/Routes'
import { onlyFrames } from '../../Routes/Misc/OnlyFrames.ts'
import { routeFrame } from './Component/mod.tsx'
import { Router } from 'Oak'


const router = new Router
router.get('/Asset/Styles/ErrorLog.css',... routeStyle({ meta : import.meta , file : 'Style.css' }))
router.get('/Frame/ErrorLog',onlyFrames,initState,determineSession,determineCookies,onlyWithCookies,routeFrame)


const Reference = IFrameReference({ name : 'ErrorLog' })


