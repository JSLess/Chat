
export { routeChatInput }

import { WithSession } from '../Session.ts'
import { Context } from 'Oak'
import { render } from 'Render'
import { Input } from '../../Frames/Input.tsx'


async function routeChatInput (
    context : Context<WithSession>
){

    context.response.body = `
        <!DOCTYPE html>
        <html>
            <head>
                <link
                    href = '/Assets/Input.css'
                    rel = stylesheet
                />
            </head>
            <body>
                ${ render(Input()) }
            </body>
        </html>
    `
}
