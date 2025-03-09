
export type { IsolateArgs }
export { Isolate }

import { render } from 'Render'
import { VNode } from 'preact'


type IsolateArgs =
    | { children : VNode }
    | { html : string }


function Isolate (
    args : IsolateArgs
){

    const html = ( 'children' in args )
        ? render(args.children) : args.html

    return <iframe srcDoc = { html } />
}
