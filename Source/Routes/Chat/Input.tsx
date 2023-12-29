
export { routeChatInput }

import { WithSession } from '../Session.ts'
import { Context } from 'Oak'
import { render } from 'Render'
import { Input } from '../../Frames/Input.tsx'
import { UTF8Meta } from 'UI/Parts'


async function routeChatInput (
    context : Context<WithSession>
){
    context.response.body = render(Component())
}


function Component (){
    return <>
        <html>
            <head>

                <UTF8Meta />

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
