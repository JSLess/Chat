
export { middleware as validateCredentials }

import { Context , Next } from 'Oak'
import { Credentials } from './Login.ts'
import { UTF8Meta } from 'UI/Parts'
import { render } from 'Render'
import { Login } from '../../../Frame/Auth/Login/Login.tsx'


async function middleware (
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
                            href = '/Asset/Login.css'
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
