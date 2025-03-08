
export { Session }

import { AsyncResponse } from 'Misc/Async'
import { sessions } from 'State'


interface ErrorInfo {
    type : string
}


class Session {

    sessionIds = new Array<string>
    errors = new Array<ErrorInfo>

    selectedMessage ?: string
    userId ?: string
    
    frames : {
        reactions_emoticons ?: AsyncResponse
        reactions_window ?: AsyncResponse
        reactions_groups ?: AsyncResponse
        reactions ?: AsyncResponse
        messages ?: AsyncResponse
        home ?: AsyncResponse
    } = {}

    contexts : {
        reactions ?: Map<string,string>
    } = {}

    id : string

    constructor (
        userId : string
    ){

        this.userId = userId
        this.id = crypto.randomUUID()

        sessions.set(this.id,this)
    }
}