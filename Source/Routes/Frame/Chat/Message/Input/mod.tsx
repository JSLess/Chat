
export { middleware as routeMessageInput }

import { UTF8Meta } from 'UI/Parts'
import { Context } from 'Oak'
import { render } from 'Render'
import { Input } from './Input.tsx'
import { WithSession } from "../../../../State.ts";


async function middleware (
    context : Context<WithSession>
){
    context.response.body = render(Component())
}


function Component (){
    return (
        <html>
            <head>

                <UTF8Meta />

                <link
                    href = '/Asset/Input.css'
                    rel = 'stylesheet'
                />

            </head>
            <body>
                <Input />
            </body>
        </html>
    )
}
