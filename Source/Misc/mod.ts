
export * from './Stylesheet.tsx'
export * from './Session'
export * from './CSS.tsx'

export { STATUS_CODE as Status } from 'HTTP'


export { apiUrl }

function apiUrl ( endpoint : string ){
    return `/API/${ endpoint }`
}