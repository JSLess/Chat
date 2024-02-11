
export { Component as Page }

import { UTF8Meta , Favicon } from 'UI/Parts'


interface Props {
    loggedIn : boolean
}


function Component ( props : Props ){

    const { loggedIn } = props

    return <>

        <html>
            <head>

                <title> Chat </title>

                <UTF8Meta />

                <link
                    href = '/Assets/Style.css'
                    rel = 'stylesheet'
                />

                <Favicon />

            </head>
            <body>

                <main>

                    <div class = 'Main' >

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
                                height = { 110 }
                                width = { 260 }
                                src = { `/Login` }
                                id = 'Login'
                            />

                        </> }


                        <div id = 'Chatting' >

                            <iframe
                                allowTransparency = { true }
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

                    </div>

                    <div class = 'Sidebar'>

                        <div>
                            <div style = { `mask-image : url('./Assets/Icons/Login.png')` } />
                        </div>

                        <div>
                            <div style = { `mask-image : url('./Assets/Icons/Logout.png')` } />
                        </div>

                    </div>

                </main>

            </body>
        </html>
    </>
}
