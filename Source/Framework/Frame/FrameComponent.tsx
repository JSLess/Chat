
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

    style ?: string

    content :
        ( args : ContentContext ) => JSX.Element

    slug : string
    uuid : string
}

interface ContentContext {
    style ?: string
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

                <style
                    dangerouslySetInnerHTML = {{
                        __html : style ?? ''
                    }}
                />

                { children }
            </>
        }
    })


    return ( args : ComponentArgs ) => {

        const { uuid } = args

        references.set(uuid,{ args , uuid })

        return frame({ content , style , slug , uuid })(args)
    }
}
