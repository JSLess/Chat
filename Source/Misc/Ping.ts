
export { handle as handlePing }

import { Context, ServerSentEvent } from 'Oak';
import { WithSession } from 'Routes';
import { AsyncResponse } from 'Misc/Async';


async function handle (
    context : Context
){
    const { state } = context as Context<WithSession>


    const { headers } = context.response
    headers.set('Content-Type','text/html;charset=utf-8')
    headers.set('Connection','keep-alive')
    headers.set('Keep-Alive',`timeout=${ 60 * 60 }`)


    const asrep = new AsyncResponse
    context.response.body = asrep.readable


    const interval = setInterval(() => {

        console.log('Pinging')

        asrep.ping()

    },2000)

    asrep.addEventListener('close',() => {
        clearInterval(interval)
        console.log('Connection was closed',state.sessionId)
    })
}

