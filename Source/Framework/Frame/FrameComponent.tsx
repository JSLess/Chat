
export type { ContentContext , FrameContext }
export type { Args as FrameComponentArgs }
export { FrameComponent }

import { frames } from '../../Routes/Frame/mod.ts'
import { JSX } from 'preact'


interface Args <ComponentArgs> {

    content :
        ( args : ContentContext ) => JSX.Element

    frame :
        ( args : FrameContext<ComponentArgs> ) =>
        ( args : { session : string } & ComponentArgs ) => JSX.Element

    style ?: string
    slug : string
}


interface FrameContext < ComponentArgs = unknown > {
    references : ReferenceMap<ComponentArgs>
    slug : string
}

interface ContentContext {
    slug : string
    uuid : string
}


type ReferenceMap <ComponentArgs> =
    Map<string,{
        args : ComponentArgs ,
        uuid : string
    }>


/**
 *  @typeParam ComponentArgs Attributes the user of the component can supply.
 */

function FrameComponent <
    ComponentArgs extends object
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


    return frame({ references , slug })
}
