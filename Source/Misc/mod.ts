import { delay } from 'Async/delay';

export * from './Stylesheet.tsx'
export * from './Expires.ts'
export * from './CSS.tsx'

export { STATUS_CODE as Status } from 'HTTP'


export { apiUrl }

function apiUrl ( endpoint : string ){
    return `/API/${ endpoint }`
}


export { Pages }


const Pages = {
    Home : '/'
}


export { Cookies }

const Cookies = {
    Session : 'Session' ,
    Errors : 'Errors'
}


export { startTimer }

function startTimer (
    minimum : number
){

    const before = Date.now()

    return {

        async waitRemaining (){
        
            const after = Date.now()

            const delta = after - before

            const rest = minimum - delta

            if( rest < 1 )
                return

            await delay(rest)
        }
    }
}


export { readIconAsDataURI }

import { encodeBase64 } from 'Encoding'

function readIconAsDataURI (
    icon : string
){
    const path = `./Source/Static/Icons/${ icon }.webp`

    const buffer = Deno.readFileSync(path)

    const uri = `data:image/webp;base64,${ encodeBase64(buffer) }`

    return uri
}


export { Headers }

const Headers = {
    Fetched_Data_Destination : 'Sec-Fetch-Dest'
}