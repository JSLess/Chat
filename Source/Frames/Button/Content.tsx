
export { Content }

import { ContentContext , Parameters } from 'Framework'


const style = await Deno.readTextFile(`./Source/Static/Styles/MinimalReset.css`)


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

        <style
            dangerouslySetInnerHTML = {{
                __html : style
            }}
        />

        <style
            dangerouslySetInnerHTML = {{
                __html : args.style ?? ''
            }}
        />

        <a
            draggable = { false }
            href = { href }
        />
    </>
}
