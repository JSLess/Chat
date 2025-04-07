
export type { ButtonArgs }
export { Button }

import { FrameArgs as ButtonArgs } from './Frame.tsx'
import { FrameComponent } from 'Framework'
import { Content } from './Content.tsx'
import { Frame } from './Frame.tsx'


const Button = FrameComponent<ButtonArgs>({

    content : Content ,
    frame : Frame ,
    slug : 'Button' ,

    style : /* css */ `

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
