
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


    const handle = form.get('handle')

    if( ! handle ){

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


    const password = form.get('password')

    if( ! password ){

        context.response.status = 400
        context.response.body = JSON.stringify({
            problem : `No password was specified`
        })

        return
    }


    context.state = { ... context.state , handle : handle! , password }


    return await next()
}
