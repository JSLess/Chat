
export type { Credentials }

export * from './Authenticate.ts'
export * from './Validate.ts'


interface Credentials {
    password : string
    handle : string
}
