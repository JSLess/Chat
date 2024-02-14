
export type { WithoutSession , WithSession , SessionState , BaseState }

import { Session } from '../Misc/Types.ts'


type BaseState = {
    hasCookies : 'Unknown' | 'Disabled' | 'Enabled'
} & SessionState

interface WithSession {
    hasSession : true
    sessionId : string
    session : Session
}

interface WithoutSession {
    hasSession : false
}

type SessionState =
    | WithoutSession
    | WithSession
