
export { router as frame }
export { frames }

import { onlySessions } from 'Misc/Routes'
import { render } from 'Render'
import { Router } from 'Oak'
import { VNode } from 'preact'
import { chat } from './Chat/mod.ts'


const frames = new Map<string,{
    component : ( args : any ) => VNode<any> ,
    ref : ( uuid : string ) => undefined | { uuid : string , args : any }
}>


const router = new Router

router.use('/Chat',onlySessions,chat.routes())
router.get('/',( context ) => {

    const type = context.request.url.searchParams.get('Type')

    if( ! type ){
        console.warn(`No Type`)
        context.response.status = 400
        return
    }

    console.debug(`Getting frame`,type)

    const frame = frames.get(type)

    if( ! frame ){
        console.warn(`No Frame`)
        context.response.status = 404
        return
    }

    const ref_ = context.request.url.searchParams.get('Ref')

    if( ! ref_ ){
        console.warn(`No Ref_`)
        context.response.status = 400
        return
    }

    const ref = frame.ref(ref_)

    if( ! ref ){
        console.warn(`No Ref`)
        context.response.status = 400
        return
    }

    const { args , uuid } = ref

    context.response.body = render(frame.component({ ... args , uuid }))

    const action = context.request.url.searchParams.get('Action')

    if( action === 'Click' )
        args.onClick()
})
