
export { router as frame }
export { frames }

import { onlySessions } from 'Misc/Routes'
import { Parameters } from '../../Framework/Frame/Parameters.ts'
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

    const type = context.request.url.searchParams.get(Parameters.FrameId)

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

    const reference = context.request.url.searchParams.get(Parameters.Reference)

    if( ! reference ){
        console.warn(`No Ref_`)
        context.response.status = 400
        return
    }

    const referenced = frame.ref(reference)

    if( ! referenced ){
        console.warn(`No Ref`)
        context.response.status = 400
        return
    }

    const { args , uuid } = referenced

    context.response.body = render(frame.component({ ... args , uuid }))

    const action = context.request.url.searchParams.get(Parameters.Event)

    if( action === 'Click' )
        args.onClick()
})
