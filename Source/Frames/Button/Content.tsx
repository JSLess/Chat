
export { Content }

import { ContentContext , Parameters } from 'Framework'


function Content (
    args : ContentContext
){

    const { slug , uuid } = args

    const search = new URLSearchParams({
        [ Parameters.Reference] : uuid ,
        [ Parameters.Event ] : 'Click' ,
        [ Parameters.Frame ] : slug
    })

    const href = `/Frame?${ search.toString() }`

    return <>

        <meta
            content = 'dark light'
            name = 'color-scheme'
        />

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
