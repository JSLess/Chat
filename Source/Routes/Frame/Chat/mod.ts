
export { router as chat }

import { routeReactSelection } from './React/Selection.tsx'
import { routeMessageInput } from './Message/Input/mod.tsx'
import { routeMessages } from './Message/List/mod.tsx'
import { Router } from 'Oak'


const router = new Router

router.get('/React/Selection',routeReactSelection)
router.get('/Message/Input',routeMessageInput)
router.get('/Message/List',routeMessages)
