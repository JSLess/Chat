
export type { Account , Message , Session , User }

import { AsyncResponse } from './AsyncResponse.ts'


interface Account {

    accountId : string
    handle : string

    password : Uint8Array
    salt : Uint8Array
}


interface Message {

    accountId : string
    messageId : string

    message : string
    time : Date
}


interface Session {
    accountId ?: string
    messages ?: AsyncResponse
    home ?: AsyncResponse
}


interface User {
    nick : string
}



