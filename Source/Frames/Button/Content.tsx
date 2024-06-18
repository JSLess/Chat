
export { Content }

import { Parameters } from '../../Framework/Frame/Parameters.ts'



function Content (
    { slug , uuid } : {
        slug : string
        uuid : string
    }
){

    const search = new URLSearchParams({
        [ Parameters.Reference] : uuid ,
        [ Parameters.Event ] : 'Click' ,
        [ Parameters.Frame ] : slug
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
