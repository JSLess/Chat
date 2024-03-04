
export { Component as Frame }

import { UTF8Meta } from 'UI/Parts'


function Component (){

    return (

        <html>
            <head>

                <UTF8Meta />

                <link
                    href = '/Asset/Styles/Frame.css'
                    rel = 'stylesheet'
                />

                <link
                    href = '/Asset/Styles/Logout.css'
                    rel = 'stylesheet'
                />

            </head>
            <body>

                <div>

                    <form
                        target = '_parent'
                        action = '/API/LogoutForm'
                        method = 'post'
                        id = 'Logout'
                    >

                        <input
                            value = 'Logout'
                            type = 'submit'
                        />

                    </form>

                </div>

            </body>
        </html>
    )
}
