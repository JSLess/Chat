
export { router as reactions }

import { onlyAuthenticated } from '../../Misc/OnlyAuthenticated.ts'
import { handleEmoticons } from './Emoticons.ts'
import { handleGroups } from './Groups.ts'
import { handleHeader } from './Header.ts'
import { Router } from 'Oak'


const router = new Router

router.use(onlyAuthenticated)

router.post('/Emoticons',handleEmoticons)
router.post('/Groups',handleGroups)
router.post('/',handleHeader)


