
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
    selectedMessage ?: string
    sessionIds : Array<string>

    frames : {
        reactions ?: AsyncResponse
        reactions_window ?: AsyncResponse
        reactions_emoticons ?: AsyncResponse
        reactions_groups ?: AsyncResponse
        home ?: AsyncResponse
        messages ?: AsyncResponse
    },

    contexts : {
        reactions ?: Map<string,string>
    }
}


interface Reaction {
    emoteId : string
    count : number
    users : Set<string>
}

