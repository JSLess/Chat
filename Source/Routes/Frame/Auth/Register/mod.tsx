
export { middleware as routeRegister }

import { UTF8Meta } from 'UI/Parts'
import { Context } from 'Oak'
import { render } from 'Render'
import { Form } from "./Form.tsx";


async function middleware (
    context : Context
){

    context.response.body = render(
        <html>
            <head>

                <UTF8Meta />

                <link
                    href = '/Asset/Register.css'
                    rel = 'stylesheet'
                />

            </head>
            <body>
                <Form />
            </body>
        </html>
    )
}
