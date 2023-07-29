
export { AsyncResponse }

import { deferred } from 'Deno/async/mod.ts'


class AsyncResponse implements Deno.Reader {

    private promise

    private done = false

    constructor (){
        this.promise = deferred<string>()
    }

    async read ( data : Uint8Array ){

        if( this.done )
            return null

        const value = await this.promise

        this.promise = deferred<string>()

        const encoder = new TextEncoder

        const bytes = encoder.encode(value)

        data.set(bytes)

        return bytes.length
    }

    write ( html : string ){
        this.promise.resolve(html)
    }

    close (){
        this.done = true
    }
}
