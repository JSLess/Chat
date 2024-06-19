
export type { Args as IsolateArgs }
export { Component as Isolate }

import { render } from 'Render'
import { VNode } from 'preact'


type Args =
    | { children : VNode }
    | { html : string }


function Component (
    args : Args
){

    const html = ( 'children' in args )
        ? render(args.children) : args.html

    return <iframe srcDoc = { html } />
}
