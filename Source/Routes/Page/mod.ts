
export { router as page }

import { routeUserData } from './UserData/mod.ts'
import { onlySessions } from 'Misc/Routes'
import { routeHome } from './Home/Home.ts'
import { Router } from 'Oak'


const router = new Router

router.get('/UserData',onlySessions,routeUserData)
router.get('/Home',routeHome)
