
export type { Args as ButtonArgs }
export { Component as Button }


interface Args {
    icon : string
}


function Component (
    { frame , icon , uuid } : Args & {
        frame : string
        uuid : string
    }
){

    const href = `/Frame?Type=${ frame }&Action=Click&Ref=${ uuid }`

    icon = `/Asset/Icons/${ icon }.webp`

    return (
        <a href = { href } >
            <img src = { icon } />
        </a>
    )
}
