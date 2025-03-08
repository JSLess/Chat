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