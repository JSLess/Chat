
export { router as frame }
export { frames }

import { onlySessions } from 'Misc/Routes'
import { WithSession } from 'Routes'
import { Parameters } from '../../Framework/Frame/Parameters.ts'
import { render } from 'Render'
import { Context, Router } from 'Oak'
import { VNode } from 'preact'
import { chat } from './Chat/mod.ts'


const frames = new Map<string,{
    component : ( args : any ) => VNode<any> ,
    ref : ( uuid : string ) => undefined | { args : any , uuid : string }
}>


const router = new Router

router.use('/Chat',onlySessions,chat.routes())
router.get('/',onlySessions,( context : Context<WithSession> ) => {

    const search = context.request.url.searchParams

    const type = search.get(Parameters.Frame)

    if( ! type ){
        console.warn(`No Type`)
        context.response.status = 400
        return
    }

    console.debug(`Getting frame`,type)

    const frame = frames.get(type)

    if( ! frame ){
        console.warn(`No frame slug`)
        context.response.status = 404
        return
    }

    const reference = search.get(Parameters.Reference)

    if( ! reference ){
        console.warn(`No frame reference`)
        context.response.status = 400
        return
    }

    const referenced = frame.ref(reference)

    if( ! referenced ){
        console.warn(`No frame under this reference`)
        context.response.status = 400
        return
    }

    const { args , uuid } = referenced

    context.response.body = render(frame.component({ ... args , uuid }))

    const action = search.get(Parameters.Event)

    const { session } = context.state

    if( action === 'Click' )
        args.onClick({ session })
})
