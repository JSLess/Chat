
export { routeChatInput }

import { WithSession } from '../Session.ts'
import { Context } from 'Oak'
import { render } from 'Render'
import { Input } from '../../Frames/Input.tsx'


async function routeChatInput (
    context : Context<WithSession>
){
    context.response.body = render(Component())
}


function Component (){
    return <>
        <html>
            <head>
                <meta
                    http-equiv = 'Content-type'
                    content = 'text/html;charset=UTF-8'
                />
                <link
                    href = '/Assets/Input.css'
                    rel = 'stylesheet'
                />
            </head>
            <body>
                <Input />
            </body>
        </html>
    </>
}
