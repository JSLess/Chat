
export { Component as CookieNotice }

import { UTF8Meta , Favicon } from 'UI/Parts'


function Component (){

    return <>

        <html>
            <head>

                <title> Missing Cookies </title>

                <UTF8Meta />

                <link
                    href = '/Assets/Style.css'
                    rel = 'stylesheet'
                />

                <Favicon />

            </head>
            <body>

                <h1 style = 'text-align:center'>
                    Please Enable Cookies
                </h1>

                <p style = 'text-align:center'>

                    This website requires cookies to work.

                </p>

                <a href = '/'>
                    Back To Home
                </a>

            </body>
        </html>
    </>
}
