
export { routeLogin }

import { Context } from 'Oak'
import { render } from 'Render'
import { Login } from '../../Frames/Login.tsx'


async function routeLogin ( context : Context ){

    context.response.body = render(
        <>
            <html>
                <head>
                    <meta
                        http-equiv = 'Content-type'
                        content = 'text/html;charset=UTF-8'
                    />
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
