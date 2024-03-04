
export type { User }


interface User {
    favorites : Set<string>
    accountId : bigint
    userId : string
    nick ?: string
}
