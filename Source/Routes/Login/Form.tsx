
export { routeLogin }

import { Context } from 'Oak'
import { render } from 'Render'
import { Login } from '../../Frames/Login.tsx'
import { UTF8Meta } from 'UI/Parts'


async function routeLogin ( context : Context ){

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
                    <Login notices = {[]} />
                </body>
            </html>
        </>
    )
}
