
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

    frame : 'Button' ,

    style : /* CSS */ `

        a {
            background : red ;
        }

        img {

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

    return (
        <iframe
            height = { 32 }
            width = { 32 }
            src = { `/Frame?Type=${ internal.frame }&Ref=${ uuid }` }
        />
    )
}


frames.set('Button',{

    ... internal ,

    ref : ( uuid : string ) => references.get(uuid) ,

    component : ( args : ButtonArgs & { uuid : string } ) => (

        <html>
            <head>

                <UTF8Meta />

                <link
                    href = '/Asset/Styles/Reset.css'
                    rel = 'stylesheet'
                />

                <style>
                    { internal.style }
                </style>

            </head>
            <body children = { internal.component({
                frame : internal.frame , ... args}
                ) } />
        </html>
    )
})


import { VNode } from "https://esm.sh/v128/preact@10.19.3/src/index.js";
import { UTF8Meta } from "UI/Parts";
