
export { Component as Logout }

import { UTF8Meta } from 'UI/Parts'


function Component (){

    return (

        <html>
            <head>

                <UTF8Meta />

                <link
                    href = '/Assets/Frame.css'
                    rel = 'stylesheet'
                />

                <link
                    href = '/Assets/Logout.css'
                    rel = 'stylesheet'
                />

            </head>
            <body>

                <div>

                    <form
                        target = '_parent'
                        action = '/Logout'
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
