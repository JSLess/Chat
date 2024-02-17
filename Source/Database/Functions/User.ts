
export { userById , userToId }

import { UserById , User } from 'Database'
import { database } from 'State'


async function userById (
    userId : string
){
    return await database
        .get<User>([ UserById , userId ])
}


async function userToId (
    userId : string ,
    user : User
){
    return await database
        .set([ UserById , userId ] , user )
}
