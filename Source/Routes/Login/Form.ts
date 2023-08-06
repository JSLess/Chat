
export { routeLogin }

import { Context } from 'Oak'
import { render } from 'Render'
import { Login } from '../../Frames/Login.tsx'


async function routeLogin ( context : Context ){

    context.response.body = `
        <!DOCTYPE html>
        <html>
            <head>
                <link
                    href = '/Assets/Login.css'
                    rel = stylesheet
                />
            </head>
            <body>
                ${ render(Login({ notices : [] })) }
            </body>
        </html>
    `
}
