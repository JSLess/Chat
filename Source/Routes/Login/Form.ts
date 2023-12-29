
export { routeLogin }

import { renderTSX } from 'Render'
import { Context } from 'Oak'
import { Login } from '../../Frames/Login.tsx'


async function routeLogin ( context : Context ){

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
                ${ renderTSX(Login({ notices : [] })) }
            </body>
        </html>
    `
}
