
export { router as frame }

import { onlySessions } from "../mod.ts";
import { Router } from 'Oak'
import { auth } from './Auth/mod.ts'
import { chat } from './Chat/mod.ts'


const router = new Router

router.use('/Auth',auth.routes())
router.use('/Chat',onlySessions,chat.routes())

