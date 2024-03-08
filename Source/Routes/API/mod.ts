
export { router as api }

import { handleSparks } from './Spark/mod.ts'
import { onlySessions } from 'Misc/Routes'
import { reactions } from './Reactions/mod.ts'
import { Router } from 'Oak'
import { chat } from './Chat/mod.ts'


const router = new Router

router.get('/Spark',onlySessions,handleSparks)

router.use('/Reactions',onlySessions,reactions.routes())
router.use('/Chat',onlySessions,chat.routes())

