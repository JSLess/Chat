
export type { Args as FrameArgs }
export { Frame }


interface Args {
    onClick : () => void
    icon : string
}


const Frame =
    ( { references , slug } : { slug : string , references : Map<string,{
        uuid : string
        args : Args
    }> } ) =>
    ( args : Args ) => {

    const uuid = crypto.randomUUID()

    references.set(uuid,{ args , uuid })

    const icon = `/Asset/Icons/${ args.icon }.webp`

    const search = new URLSearchParams({
        Type : slug ,
        Ref : uuid
    })

    const src = `/Frame?${ search.toString() }`

    return (
        <div class = 'Button' >

            <img src = { icon } />

            <iframe src = { src } />

        </div>
    )
}
