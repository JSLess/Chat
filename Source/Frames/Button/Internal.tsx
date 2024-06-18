
export { references , internal }

import { Component } from './Component.tsx'
import { FrameArgs } from './Frame.tsx'
import { frames } from '../../Routes/Frame/mod.ts'


const references = new Map<string,{
    args : FrameArgs
    uuid : string
}>


const internal = {

    component : Component ,

    frameId : 'Button' ,

    style : /* CSS */ `

        a {
            border-radius : 4px ;
            aspect-ratio : 1 ;
            display : block ;
            width : 100% ;
        }

        a:hover {
            background : #ffffff1f ;
        }

        a:active {
            background : #ffffff2f ;
        }
    `
}


frames.set(internal.frameId,{

    ... internal ,

    ref : ( uuid : string ) =>
        references.get(uuid) ,

    component : ( args : { uuid : string } ) => {

        const { component , frameId , style } = internal

        const children = component({
            frameId , ... args
        })

        return <>

            <style children = { style } />

            { children }
        </>
    }
})


