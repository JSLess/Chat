
export { AsyncResponse }

import { deferred } from 'Deno/async/mod.ts'


class AsyncResponse implements Deno.Reader {

    private hasData

    private done = false

    private queue : Array<string>

    constructor (){
        this.hasData = deferred()
        this.queue = []
    }

    async read ( data : Uint8Array ){ // Max 16640 chars

        if( this.done )
            return null

        if( this.queue.length < 1 ){
            this.hasData = deferred()
            await this.hasData
        }

        const value = this
            .queue.shift()!


        const encoder = new TextEncoder

        const bytes = encoder.encode(value)

        data.set(bytes)

        return bytes.length
    }

    write ( html : string ){

        this.queue.push(html)

        if( this.queue.length === 1 )
            this.hasData.resolve()
    }

    close (){
        this.done = true
    }
}
