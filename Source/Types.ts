
export type { PopArray }
export type { Account , Message , Session , Reaction , User }

import { AsyncResponse } from './AsyncResponse.ts'


type PopArray<Type> =
	| [ Type , ... Array<Type> , Type ]
	| [ Type , ... Array<Type> ]
	| [ ... Array<Type> , Type ]


interface Account {

    password : Uint8Array
    salt : Uint8Array

    accountId : string
    handle : string
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
    selectedMessage ?: string
    sessionIds : Array<string>
}


interface User {
    nick : string
}


interface Reaction {
    emoteId : string
    count : number
    users : Set<string>
}

