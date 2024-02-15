
export { createAccount }

import { database } from 'State'
import { delay } from 'https://deno.land/std@0.215.0/async/mod.ts'
import { ulid } from 'https://deno.land/x/ulid@v0.3.0/mod.ts'



function bufferToBigInt ( buffer : Uint8Array ){

    let number = 0n

    for ( const value of buffer.values() )
        number = ( number << 8n ) + BigInt(value)

    return number
}


function clampLength ( number : bigint ){
    return BigInt(number.toString().slice(0,16))
}


function randomDigits (){

    const buffer = new Uint8Array(8)

    crypto.getRandomValues(buffer)

    return clampLength(bufferToBigInt(buffer))
}


async function createAccount (){

    const before = Date.now()

    const userId = ulid()

    const account = { userId }


    let accountId : bigint ,
        attempts = 0 ,
        ok = false

    while ( true ){

        attempts++

        accountId = randomDigits()

        const key = [ 'Account_By_Id' , accountId ] as const


        const result = await database
            .atomic()
            .check({ key , versionstamp : null })
            .set(key,account)
            .commit()

        ok = result.ok


        if( ok )
            break

        if( attempts > 10 )
            break
    }


    if( ok ){

        const user = {
            nick : null
        }

        await database.set([ 'User_By_Id' , userId ] , user )
    }


    const after = Date.now()

    const remaining = 100 - ( after - before )

    await delay(remaining)

    if( ok )
        return Promise.resolve({
            accountId , userId
        })

    return Promise.reject()
}
