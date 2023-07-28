
export type { Message , User }

import { AsyncResponse } from './AsyncResponse.ts'


interface User {
    messages : Array<string>
    response : AsyncResponse
    username : string
    userId : string
}

interface Message {
    messageId : string
    message : string
    userId : string
    time : Date
}
