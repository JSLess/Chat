
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
                        height = { 60 }
                        src = { `/Chat/Input` }
                        id = 'Input'
                    />

                </>}

            </body>
        </html>
    </>
}
