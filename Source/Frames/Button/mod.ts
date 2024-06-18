
export type { Args as ButtonArgs }
export { Component as Button }

import { FrameArgs as Args } from './Frame.tsx'
import { FrameComponent } from 'Framework'
import { Content } from './Content.tsx'
import { Frame } from './Frame.tsx'


const Component = FrameComponent<Args>({

    content : Content ,
    frame : Frame ,
    slug : 'Button' ,

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
})
