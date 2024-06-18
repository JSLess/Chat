
export type { Args as ButtonArgs }
export { Component as Button }


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
        Action : 'Click' ,
        Type : frameId ,
        Ref : uuid
    })

    const href = `/Frame?${ search.toString() }`

    return (
        <a
            draggable = { false }
            href = { href }
        />
    )
}
