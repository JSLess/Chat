
export type { PopArray }
export type { Message , Reaction }
export type { Session } from './Session.ts'



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


interface Reaction {
    emoteId : string
    count : number
    users : Set<string>
}

