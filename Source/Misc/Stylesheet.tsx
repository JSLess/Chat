
export { Stylesheet }


interface StylesheetArgs {
    path : string
}


/**
 *  Stylesheet Link Wrapper
 */

function Stylesheet (
    args : StylesheetArgs
){

    const { path } = args

    const href = `/Asset/Styles/${ path }.css`

    return (
        <link
            href = { href }
            rel = 'stylesheet'
        />
    )
}