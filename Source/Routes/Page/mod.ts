
export { router as page }

import { routeUserData } from './UserData/mod.ts'
import { routeHome } from './Home.ts'
import { Router } from 'Oak'
import { onlySessions } from "../mod.ts";


const router = new Router

router.get('/UserData',onlySessions,routeUserData)
router.get('/Home',routeHome)
