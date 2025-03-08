
export { createAccount }

import { UserIdByAccount , userToId } from 'Database'
import { database } from 'State'
import { delay } from 'Async'
import { ulid } from 'ULID'


function toBigInt (
    buffer : Uint8Array
){

    let number = 0n

    for ( const value of buffer.values() )
        number = ( number << 8n ) + BigInt(value)

    return number
}


function clamp (
    number : bigint
){
    const clamped = number
        .toString()
        .slice(0,16)

    return BigInt(clamped)
}


function randomDigits (){

    const buffer = new Uint8Array(8)

    crypto.getRandomValues(buffer)

    return clamp(toBigInt(buffer))
}


async function createAccount (){

    const before = Date.now()

    const userId = ulid()

    let accountId : bigint ,
        attempts = 0 ,
        ok = false

    while ( true ){

        attempts++

        accountId = randomDigits()

        const key = [ UserIdByAccount , accountId ] as const


        const result = await database
            .atomic()
            .check({ key , versionstamp : null })
            .set(key,userId)
            .commit()

        ok = result.ok


        if( ok )
            break

        if( attempts > 10 )
            break
    }


    if( ok )
        await userToId(userId,{ accountId , userId , favorites : new Set })


    const after = Date.now()

    const remaining = 100 - ( after - before )

    await delay(remaining)

    if( ok )
        return Promise.resolve({
            accountId , userId
        })

    return Promise.reject()
}
