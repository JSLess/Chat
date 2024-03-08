
export { router as chat }

import { serveEmoticons } from './Reactions/Emoticons/mod.ts'
import { serveReactions } from './Reactions/mod.ts'
import { routeMessages } from './Message/List/mod.tsx'
import { serveGroups } from './Reactions/Groups/mod.ts'
import { Router } from 'Oak'


const router = new Router

router.get('/Message/List',routeMessages)

router.get('/Reactions/Emoticons',serveEmoticons)
router.get('/Reactions/Groups',serveGroups)
router.get('/Reactions',serveReactions)
