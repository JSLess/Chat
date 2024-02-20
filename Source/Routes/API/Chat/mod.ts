
export { router as chat }

import { routeSelectMessage } from './Message/Select.ts'
import { onlyAuthenticated } from '../../Misc/OnlyAuthenticated.ts'
import { routeSendMessage } from './Message/Send.tsx'
import { routeReactToggle } from './Message/React/Toggle.ts'
import { routeReactUnhover } from './Message/React/Unhover.ts'
import { routeReactHover } from './Message/React/Hover.ts'
import { routeReactDrag } from './Message/React/Drag.ts'
import { routeReactDrop } from './Message/React/Drop.ts'
import { Router } from 'Oak'


const router = new Router

router.use(onlyAuthenticated)
router.post('/Message/React/Toggle',routeReactToggle)

router.get('/Message/React/Unhover',routeReactUnhover)
router.get('/Message/React/Hover',routeReactHover)

router.get('/Message/React/Drag',routeReactDrag)
router.get('/Message/React/Drop',routeReactDrop)

router.post('/Message/Select',routeSelectMessage)
router.post('/Message/Send',routeSendMessage)
