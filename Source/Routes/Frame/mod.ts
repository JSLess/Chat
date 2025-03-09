
export { router as frame }
export { frames }

import { Context , Router } from 'Oak'
import { onlySessions } from 'Misc/Routes'
import { WithSession } from 'Routes'
import { Parameters } from '../../Framework/Frame/Parameters.ts'
import { render } from 'Render'
import { Status } from 'Misc'
import { VNode } from 'preact'
import { chat } from './Chat/mod.ts'


const frames = new Map<string,{
    component : ( args : any ) => VNode<any> ,
    ref : ( uuid : string ) => undefined | { args : any , uuid : string }
}>


const router = new Router

router.use('/Chat',onlySessions,chat.routes())

router.get('/',onlySessions,( 
    context : Context<WithSession> 
) => {

    const { response , request , state } = context

    const search = request.url.searchParams


    const type = search.get(Parameters.Frame)

    if( ! type ){
        console.warn(`No Type`)
        response.status = Status.BadRequest
        return
    }


    const frame = frames.get(type)

    if( ! frame ){
        console.warn(`No frame slug`)
        response.status = Status.NotFound
        return
    }

    
    const reference = search.get(Parameters.Reference)

    if( ! reference ){
        console.warn(`No frame reference`)
        response.status = Status.BadRequest
        return
    }

    
    const referenced = frame.ref(reference)

    if( ! referenced ){
        console.warn(`No frame under this reference`)
        response.status = Status.BadRequest
        return
    }


    const { args , uuid } = referenced

    const element = frame.component({ ... args , uuid })

    response.body = render(element)


    const action = search.get(Parameters.Event)

    const { session } = state

    if( action === 'Click' )
        args.onClick({ session })
})
