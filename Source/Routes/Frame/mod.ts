
export { router as frame }

import { onlySessions } from '../mod.ts'
import { Router } from 'Oak'
import { chat } from './Chat/mod.ts'


const router = new Router

router.use('/Chat',onlySessions,chat.routes())

