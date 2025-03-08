
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