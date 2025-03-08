
export type { 
    DisabledCookies ,
    EnabledCookies ,
    WithoutSession , 
    UnknownCookies ,
    SessionState , 
    WithSession , 
    CookieState ,
    BaseState
}

import { Session } from '../Misc/Types.ts'


type UnknownCookies = {
    hasCookies : 'Unknown'
}

type EnabledCookies = {
    hasCookies : 'Enabled'
}

type DisabledCookies = {
    hasCookies : 'Disabled'
}

type CookieState =
    | UnknownCookies
    | EnabledCookies
    | DisabledCookies


type BaseState = CookieState & SessionState

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
