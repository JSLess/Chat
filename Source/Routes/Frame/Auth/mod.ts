
export { router as auth }

import { routeLogout } from './Logout/mod.ts'
import { routeLogin } from './Login/mod.tsx'
import { Router } from 'Oak'


const router = new Router

router.get('/Logout',routeLogout)
router.get('/Login',routeLogin)
