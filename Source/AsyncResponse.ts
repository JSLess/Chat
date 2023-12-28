
export { AsyncResponse }


class AsyncResponse {

    public readonly readable : ReadableStream
    private controller : null | ReadableStreamController<Uint8Array> = null


    constructor (){

        this.readable = new ReadableStream<Uint8Array>({

            type : 'bytes' ,

            start : ( controller ) => {
                this.controller = controller
            }
        })
    }

    close (){

        if( ! this.controller )
            throw `AsyncResponse controller is not initialized`

        this.controller?.close()
    }


    write ( html : string ){

        const encoder = new TextEncoder

        const bytes = encoder.encode(html)

        if( ! this.controller )
            throw `AsyncResponse controller is not initialized`

        this.controller?.enqueue(bytes)
    }
}
