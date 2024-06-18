
export type { FrameArgs as ButtonArgs } from './Frame.tsx'
export { Component as Button }

import { FrameArgs , Frame } from './Frame.tsx'
import { FrameComponent } from '../../Framework/Frame/FrameComponent.tsx'
import { Content } from './Content.tsx'


const Component = FrameComponent<FrameArgs>({

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
