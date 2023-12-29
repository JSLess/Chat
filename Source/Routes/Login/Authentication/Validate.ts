
export { validateLoginCredentials }

import { Context , Next } from 'Oak'
import { Credentials } from './mod.ts'
import { renderTSX } from 'Render'
import { Login } from '../../../Frames/Login.tsx'


async function validateLoginCredentials (
    context : Context<Credentials> ,
    next : Next
){

    const form = await context.request.body({ type : 'form' }).value


    const handle = form.get('handle')

    if( ! handle ){
        context.response.status = 400
        context.response.body = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta
                        http-equiv = 'Content-type'
                        content = 'text/html;charset=UTF-8'
                    >
                    <link
                        href = '/Assets/Login.css'
                        rel = stylesheet
                    />
                </head>
                <body>
                    ${ renderTSX(Login({ notices : [{
                        title : 'Missing Handle' ,
                        description : `No user handle has been specified`
                    }] })) }
                </body>
            </html>
        `

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
