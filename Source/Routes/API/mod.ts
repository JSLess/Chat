
export { router as api }

import { validateCredentials } from './Auth/Login/Validate.tsx'
import { routeLogout } from './Auth/Logout.ts'
import { routeLogin } from './Auth/Login/Login.ts'
import { Router } from 'Oak'
import { chat } from './Chat/mod.ts'
import { onlySessions } from "../mod.ts";


const router = new Router

router.use('/Chat',onlySessions,chat.routes())

router.post('/Auth/Logout',routeLogout)
router.post('/Auth/Login',validateCredentials,routeLogin)

