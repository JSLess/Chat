
export { Content }

import { ContentContext , Parameters } from 'Framework'
import { CSS } from 'Misc'


const style = await Deno
    .readTextFile(`./Source/Static/Styles/MinimalReset.css`)


function Content (
    args : ContentContext
){

    const { slug , uuid } = args

    const search = new URLSearchParams({
        [ Parameters.Reference ] : uuid ,
        [ Parameters.Event ] : 'Click' ,
        [ Parameters.Frame ] : slug
    })

    const href = `/Frame?${ search.toString() }`

    return <>

        <meta
            content = 'dark light'
            name = 'color-scheme'
        />

        <CSS content = { style } />

        { ( args.style ) && <CSS content = { args.style } /> }

        <a
            draggable = { false }
            href = { href }
        />
    </>
}
