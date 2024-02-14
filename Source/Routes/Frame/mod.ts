
export { router as frame }

import { onlyFrames } from '../Misc/OnlyFrames.ts'
import { Router } from 'Oak'
import { auth } from './Auth/mod.ts'
import { chat } from './Chat/mod.ts'
import { onlySessions } from "../mod.ts";


const router = new Router

router.use('/Auth',auth.routes())
router.use('/Chat',onlySessions,chat.routes())

