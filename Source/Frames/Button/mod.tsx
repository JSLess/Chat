
export type { ButtonArgs } from './Component.tsx'
export { Frame as Button }

import { Button, ButtonArgs } from './Component.tsx'
import { frames } from "../../Routes/Frame/mod.ts"


const references = new Map<string,{
    args : ButtonArgs
    uuid : string
}>


const internal = {

    component : Button ,

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


function Frame (
    args : ButtonArgs & {
        onClick : () => void
    }
){

    const uuid = crypto.randomUUID()

    references.set(uuid,{ args , uuid })

    const icon = `/Asset/Icons/${ args.icon }.webp`

    const search = new URLSearchParams({
        Type : internal.frameId ,
        Ref : uuid
    })

    const src = `/Frame?${ search.toString() }`

    return (
        <div class = 'Button' >

            <img src = { icon } />

            <iframe src = { src } />

        </div>
    )
}


frames.set('Button',{

    ... internal ,

    ref : ( uuid : string ) => references.get(uuid) ,

    component : ( args : { uuid : string } ) => {

        const { component , frameId , style } = internal

        const children = component({
            frameId , ... args
        })

        return <>

            <link
                href = '/Asset/Styles/MinimalReset.css'
                rel = 'stylesheet'
            />

            <style children = { style } />

            { children }
        </>
    }
})


