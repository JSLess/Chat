
export { router as api }

import { routeRegister } from './Auth/Register.ts'
import { handleSparks } from './Spark/mod.ts'
import { onlySessions } from '../mod.ts'
import { routeLogout } from './Auth/Logout.ts'
import { reactions } from './Reactions/mod.ts'
import { Router } from 'Oak'
import { chat } from './Chat/mod.ts'


const router = new Router

router.get('/Spark',onlySessions,handleSparks)

router.use('/Reactions',onlySessions,reactions.routes())
router.use('/Chat',onlySessions,chat.routes())

router.post('/Auth/Register',routeRegister)
router.post('/Auth/Logout',routeLogout)

