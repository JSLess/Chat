
export { AsyncResponse }

import { render } from 'Preact/Render'
import { VNode } from 'Preact'


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

        try {
            this.controller?.close()
        } catch {}
    }


    write ( element : VNode ) : void
    write ( html : string ) : void

    write ( data : string | VNode ){

        if( typeof data !== 'string' )
            data = render(data)

        const encoder = new TextEncoder

        const bytes = encoder.encode(data)

        if( ! this.controller )
            throw `AsyncResponse controller is not initialized`

        try {
            this.controller.enqueue(bytes)
        } catch {
            console.log('Stream was already closed')
        }
    }


    refresh (){
        this.write(`
            <meta
                http-equiv = refresh
                content = 0
            />
        `)
    }

    redirect ( url : string ){
        this.write(`
            <meta
                http-equiv = refresh
                content = '0;url=${ url }'
            />
        `)
    }
}
