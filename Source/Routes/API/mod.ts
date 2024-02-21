
export { router as api }

import { validateCredentials } from './Auth/Login/Validate.tsx'
import { routeRegister } from './Auth/Register.ts'
import { handleSparks } from './Spark/mod.ts'
import { onlySessions } from '../mod.ts'
import { routeLogout } from './Auth/Logout.ts'
import { routeLogin } from './Auth/Login/Login.ts'
import { Router } from 'Oak'
import { chat } from './Chat/mod.ts'


const router = new Router

router.get('/Spark',onlySessions,handleSparks)

router.use('/Chat',onlySessions,chat.routes())

router.post('/Auth/Register',routeRegister)
router.post('/Auth/Logout',routeLogout)
router.post('/Auth/Login',validateCredentials,routeLogin)

