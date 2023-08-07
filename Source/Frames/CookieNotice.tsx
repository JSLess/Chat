
export { Component as CookieNotice }


function Component (){

    return <>

        <html>
            <head>

                <title> Missing Cookies </title>

                <link
                    href = '/Assets/Style.css'
                    rel = 'stylesheet'
                />

                <link
                    href = '${ Favicon }'
                    type = 'image/x-icon'
                    rel = 'icon'
                />

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
