
export { hash }

import { fromFileUrl , dirname , join } from 'Deno/path/mod.ts'
import argon from 'Argon/lib/argon2id.js'


const memory = new WebAssembly
    .Memory({
        maximum : 65536  ,  // 4GB
        initial : 1040      // 65MB
    })


const imports = {
    env : { memory }
}


const path = join(dirname(fromFileUrl(import.meta.url)),'SIMD.wasm')

const bytes = await Deno.readFile(path)

const wasm = await WebAssembly
    .instantiate(bytes,imports)



interface HashProps {

    password : Uint8Array
    secret ?: Uint8Array
    salt : Uint8Array
    ad ?: Uint8Array

    parallelism : number
    memorySize : number
    tagLength : number
    passes : number
}


const hash = ( props : HashProps ) =>
    argon(props,{ instance : wasm.instance , memory })

