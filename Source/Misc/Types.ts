
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


interface ErrorInfo {
    type : string
}


interface Session {

    errors : Array<ErrorInfo>

    selectedMessage ?: string
    userId ?: string

    sessionIds : Array<string>

    frames : {
        reactions_emoticons ?: AsyncResponse
        reactions_window ?: AsyncResponse
        reactions_groups ?: AsyncResponse
        reactions ?: AsyncResponse
        messages ?: AsyncResponse
        home ?: AsyncResponse
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

