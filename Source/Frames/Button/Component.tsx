
export type { Args as ButtonArgs }
export { Component as Button }


interface Args {
    icon : string
}


function Component (
    { frame , uuid } : {
        frame : string
        uuid : string
    }
){

    const href = `/Frame?Type=${ frame }&Action=Click&Ref=${ uuid }`

    return (
        <a
            draggable = { false }
            href = { href }
        />
    )
}
