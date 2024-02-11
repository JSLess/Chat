
export { validateLoginCredentials }

import { Context , Next } from 'Oak'
import { Credentials } from './mod.ts'
import { render } from 'Render'
import { Login } from '../../../Frames/Login.tsx'
import { UTF8Meta } from 'UI/Parts'


async function validateLoginCredentials (
    context : Context<Credentials> ,
    next : Next
){

    const form = await context.request.body({ type : 'form' }).value


    const accountId = form.get('Account')

    if( ! accountId ){

        context.response.status = 400

        context.response.body = render(
            <>
                <html>
                    <head>

                        <UTF8Meta />

                        <link
                            href = '/Assets/Login.css'
                            rel = 'stylesheet'
                        />
                    </head>
                    <body>

                        <Login
                            notices = {[{
                                title : 'Missing Handle' ,
                                description : `No user handle has been specified`
                            }]}
                        />

                    </body>
                </html>
            </>
        )

        return
    }


    context.state = { ... context.state , accountId }


    return await next()
}
