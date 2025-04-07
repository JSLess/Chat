
export type { ButtonArgs }
export { Button }

import { FrameArgs as ButtonArgs } from './Frame.tsx'
import { FrameComponent } from 'Framework'
import { Content } from './Content.tsx'
import { Frame } from './Frame.tsx'


const Button = FrameComponent<ButtonArgs>({
    content : Content ,
    frame : Frame ,
    sheet : 'Button-Link' ,
    slug : 'Button'
})
