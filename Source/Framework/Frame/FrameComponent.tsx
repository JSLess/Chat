
export type { FrameComponentArgs , ContentContext , FrameContext }
export { FrameComponent }

import { frames } from '../../Routes/Frame/mod.ts'
import { JSX } from 'preact'


type FrameComponentArgs <ComponentArgs> = 
    & FrameComponentFuncs<ComponentArgs>
    & FrameComponentVars


interface FrameComponentFuncs <ComponentArgs> {

    content :
        ( args : ContentContext ) => JSX.Element

    frame :
        ( args : FrameContext ) =>
        ( args : { uuid : string } & ComponentArgs ) => JSX.Element
}

interface FrameComponentVars {
    style ?: string
    sheet ?: string
    slug : string
}


interface FrameContext {
    sheet ?: string
    style ?: string
    slug : string
    uuid : string
}

interface ContentContext {
    style ?: string
    sheet ?: string
    slug : string
    uuid : string
}


/**
 *  @typeParam ComponentArgs Attributes the user of the component can supply.
 */

function FrameComponent <
    ComponentArgs extends { uuid : string } ,
>(
    frameArgs : FrameComponentArgs<ComponentArgs>
){

    const { content , frame , style , sheet , slug } = frameArgs

    const references = new Map<string,{
        args : FrameComponentVars & ComponentArgs
        uuid : string
    }>


    frames.set(slug,{

        component : ( args : { uuid : string } ) =>
            content({ slug , ... args }),

        ref : ( uuid : string ) =>
            references.get(uuid)
    })


    const vars = { sheet , style , slug }


    return ( 
        args : ComponentArgs 
    ) => {

        const { uuid } = args

        references.set(uuid,{ args : { ... vars , ... args }  , uuid })

        return frame({ style , sheet , slug , uuid })(args)
    }
}
