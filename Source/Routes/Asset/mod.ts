
export { router as asset }

import { withValidPath } from './Path.ts'
import { onlySameSite } from './SameSite.ts'
import { routeAsset } from './Generic.ts'
import { Router } from 'Oak'


const router = new Router
router.get('/:path+',onlySameSite,withValidPath,routeAsset)
