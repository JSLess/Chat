
export { router as chat }

import { routeSelectMessage } from './Message/Select.ts'
import { onlyAuthenticated } from '../../Misc/OnlyAuthenticated.ts'
import { routeReactToggle } from './Message/React/Toggle.ts'
import { Router } from 'Oak'


const router = new Router

router.use(onlyAuthenticated)
router.post('/Message/React/Toggle',routeReactToggle)

router.post('/Message/Select',routeSelectMessage)
