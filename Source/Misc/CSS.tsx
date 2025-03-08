
export { CSS }


interface CSSArgs {
    content : string
}


/**
 *  Style tag wrapper
 */

function CSS (
    args : CSSArgs
){

    const { content : __html } = args

    return <style dangerouslySetInnerHTML = {{ __html }} />
}