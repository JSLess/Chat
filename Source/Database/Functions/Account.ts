
export { userIdByAccount , accountToUserId }

import { UserIdByAccount } from 'Database'
import { database } from 'State'


async function userIdByAccount (
    accountId : bigint
){
    return await database
        .get<string>([ UserIdByAccount , accountId ])
}


async function accountToUserId (
    accountId : bigint ,
    userId : string
){
    return await database
        .set([ UserIdByAccount , accountId ] , userId )
}
