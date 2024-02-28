
export { middleware as handleEmoticons }

import { WithSession } from '../../State.ts'
import { Context } from 'Oak'



async function middleware (
    context : Context<WithSession>
){
    console.debug(`Emoticons Action`)



    context.response.status = 200
}
