
export { comparePasswords , hashPassword }

import { timingSafeEqual } from 'Deno/crypto/mod.ts'
import { hash } from './Argon/mod.ts'


const pepper_raw = Deno.env.get('Pepper')

if( ! pepper_raw )
    throw `No Pepper specified`


const pepper = new TextEncoder().encode(pepper_raw)

const WorkFactor = {
    parallelism : 1 ,
    memorySize : 12 ,// 12MiB
    tagLength : 32 , // 32 Bytes
    passes : 3 ,
    secret : pepper
}


interface HashPasswordProps {
    password : Uint8Array
    salt : Uint8Array
}

function hashPassword ( props : HashPasswordProps ){
    return hash({ ... WorkFactor , ... props })
}


interface ComparePasswordProps {
    password : Uint8Array
    hashed : Uint8Array
    salt : Uint8Array
}

function comparePasswords ( props : ComparePasswordProps ){

    const hash = hashPassword(props)

    console.debug('Compare Passwords',props,hash)

    return timingSafeEqual(hash,props.hashed)
}
