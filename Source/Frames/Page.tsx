
export { Component as Page }

import Favicon from '../Components/Favicon.ts'


interface Props {
    loggedIn : boolean
}


function Component ( props : Props ){

    const { loggedIn } = props

    return <>

        <html>
            <head>

                <title> Chat </title>

                <meta
                    http-equiv = 'Content-type'
                    content = 'text/html;charset=UTF-8'
                />

                <link
                    href = '/Assets/Style.css'
                    rel = 'stylesheet'
                />

                <link
                    href = { Favicon }
                    type = 'image/x-icon'
                    rel = 'icon'
                />

            </head>
            <body>

                { ( loggedIn ) && <>

                    <iframe
                        allowFullScreen = { false }
                        loading = 'lazy'
                        height = { 50 }
                        src = { `/Logout` }
                        id = 'Logout'
                    />

                </> }

                <h1 style = 'text-align:center' >
                    HTML Only Chat
                </h1>


                { ( ! loggedIn ) && <>

                    <iframe
                        allowFullScreen = { false }
                        loading = 'lazy'
                        height = { 260 }
                        src = { `/Login` }
                        id = 'Login'
                    />

                </> }


                <div id = 'Chatting' >

                    <iframe
                        allowFullScreen = { false }
                        loading = 'lazy'
                        src = { `/Chat` }
                        id = 'Messages'
                    />

                    { ( loggedIn ) && <>

                        <iframe
                            allowFullScreen = { false }
                            loading = 'lazy'
                            height = '100%'
                            width = '100%'
                            src = { `/Chat/React` }
                            id = 'Input'
                        />

                    </> }

                </div>


                { ( loggedIn ) && <>

                    <iframe
                        allowFullScreen = { false }
                        loading = 'lazy'
                        height = { 70 }
                        src = { `/Chat/Input` }
                        id = 'Input'
                    />

                </> }

            </body>
        </html>
    </>
}
