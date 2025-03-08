
export { AsyncResponse }

import { render } from 'Preact/Render'
import { VNode } from 'preact'


interface Events {
    'close' : CustomEvent
}

interface Target
extends EventTarget {

    addEventListener < Type extends keyof Events > (
      type : Type,
      listener : ( event : Events[ Type ] ) => void ,
      options? : boolean | AddEventListenerOptions
    ) : void

    addEventListener (
      type : string ,
      callback : null | EventListenerOrEventListenerObject ,
      options? : boolean | EventListenerOptions
    ) : void
}

const TypedTarget = EventTarget as {
    prototype : Target
    new () : Target
}


class AsyncResponse
extends TypedTarget {



    public readonly readable : ReadableStream
    private controller : null | ReadableStreamController<Uint8Array> = null


    constructor (){

        super()

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

        this.dispatchClose()
    }


    private dispatchClose (){

        const event = new CustomEvent('close')

        this.dispatchEvent(event)
    }

    ping (){
        this.write(new Uint8Array([0]))
    }


    write ( element : VNode ) : void
    write ( bytes : Uint8Array ) : void
    write ( html : string ) : void

    write ( data : string | VNode | Uint8Array ){

        if( ! ( data instanceof Uint8Array ) && typeof data !== 'string' )
            data = render(data)

        if( ! ( data instanceof Uint8Array ) )
            data = new TextEncoder().encode(data)

        if( ! this.controller )
            throw `AsyncResponse controller is not initialized`

        try {
            this.controller.enqueue(data)
        } catch {
            console.log('Stream was already closed')
            this.dispatchClose()
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
