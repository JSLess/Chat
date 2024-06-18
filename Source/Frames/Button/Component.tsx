import { Parameters } from '../../Framework/Frame/Parameters.ts';

export type { Args as ComponentArgs }
export { Component }


interface Args {
    icon : string
}


function Component (
    { frameId , uuid } : {
        frameId : string
        uuid : string
    }
){

    const search = new URLSearchParams({
        [ Parameters.Reference] : uuid ,
        [ Parameters.FrameId ] : frameId ,
        [ Parameters.Event ] : 'Click'
    })

    const href = `/Frame?${ search.toString() }`

    return <>

        <link
            href = '/Asset/Styles/MinimalReset.css'
            rel = 'stylesheet'
        />

        <a
            draggable = { false }
            href = { href }
        />
    </>
}
