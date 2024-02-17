
export type { PopArray }
export type { Message , Session , Reaction }

import { AsyncResponse } from 'Misc/Async'


type PopArray<Type> =
	| [ Type , ... Array<Type> , Type ]
	| [ Type , ... Array<Type> ]
	| [ ... Array<Type> , Type ]



interface Message {

    messageId : string
    userId : string

    message : string
    time : Date
}


interface Session {
    userId ?: string
    messages ?: AsyncResponse
    home ?: AsyncResponse
    selectedMessage ?: string
    sessionIds : Array<string>
}


interface Reaction {
    emoteId : string
    count : number
    users : Set<string>
}

