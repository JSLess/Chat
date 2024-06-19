
export type { ContentContext , FrameContext }
export type { Args as FrameComponentArgs }
export { FrameComponent }

import { frames } from '../../Routes/Frame/mod.ts'
import { JSX } from 'preact'


interface Args <ComponentArgs> {

    content :
        ( args : ContentContext ) => JSX.Element

    frame :
        ( args : FrameContext ) =>
        ( args : { uuid : string } & ComponentArgs ) => JSX.Element

    style ?: string
    slug : string
}


interface FrameContext {
    slug : string
    uuid : string
}

interface ContentContext {
    slug : string
    uuid : string
}


/**
 *  @typeParam ComponentArgs Attributes the user of the component can supply.
 */

function FrameComponent <
    ComponentArgs extends { uuid : string }
>(
    { content , frame , style , slug } : Args<ComponentArgs>
){

    const references = new Map<string,{
        args : ComponentArgs
        uuid : string
    }>


    frames.set(slug,{

        ref : ( uuid : string ) =>
            references.get(uuid) ,

        component : ( args : { uuid : string } ) => {

            const children = content({
                slug , ... args
            })

            return <>

                <style children = { style } />

                { children }
            </>
        }
    })


    return ( args : ComponentArgs ) => {

        console.log('Args',args)

        const { uuid } = args

        references.set(uuid,{ args , uuid })

        return frame({ slug , uuid })(args)
    }
}
