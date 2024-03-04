
export { router as auth }

import { routeRegister } from './Register/mod.tsx'
import { routeLogout } from './Logout/mod.ts'
import { Router } from 'Oak'


const router = new Router

router.get('/Register',routeRegister)
router.get('/Logout',routeLogout)
