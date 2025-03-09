
export { handleEmoticons }

import { WithSession } from 'Routes/State'
import { Context } from 'Oak'
import { Status } from 'Misc'


async function handleEmoticons (
    context : Context<WithSession>
){
    console.debug(`Emoticons Action`)



    context.response.status = Status.OK
}
