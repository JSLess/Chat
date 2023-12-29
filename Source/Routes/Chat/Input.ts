
export { routeChatInput }

import { WithSession } from '../Session.ts'
import { renderTSX } from 'Render'
import { Context } from 'Oak'
import { Input } from '../../Frames/Input.tsx'


async function routeChatInput (
    context : Context<WithSession>
){

    context.response.body = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta
                    http-equiv = 'Content-type'
                    content = 'text/html;charset=UTF-8'
                >
                <link
                    href = '/Assets/Input.css'
                    rel = stylesheet
                />
            </head>
            <body>
                ${ renderTSX(Input()) }
            </body>
        </html>
    `
}
