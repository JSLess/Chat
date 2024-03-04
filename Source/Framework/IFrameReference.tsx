
export type { Props as IFrameReferenceProps }
export { Component as IFrameReference }

import { JSX } from 'Preact'


interface Options {
    name : string
}


type IFrameProps = JSX.HTMLAttributes<HTMLIFrameElement>

type Props = Omit<IFrameProps,'src'>


function Component ( options : Options ){

    return ( props : Props ) => (
        <iframe
            { ... props }
            src = { `/Frame/${ options.name }` }
        />
    )
}
