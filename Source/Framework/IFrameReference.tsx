
export type { IFrameReferenceProps }
export { IFrameReference }

import { JSX } from 'preact'


interface IFrameReferenceProps {
    name : string
}


type IFrameArgs = Omit<JSX.HTMLAttributes<HTMLIFrameElement>,'src'>


function IFrameReference ( 
    args : IFrameReferenceProps 
){

    const src = `/Frame/${ args.name }`

    return ( props : IFrameArgs ) => (
        <iframe { ... { ... props , src }  } />
    )
}
