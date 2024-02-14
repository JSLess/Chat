
export { Component as Page }

import { UTF8Meta } from 'UI/Parts'
import { BaseState } from "../../State.ts";


type Props = BaseState


function Component ( props : Props ){

    const { hasSession , hasCookies } = props

    return <>

        <html>
            <head>

                <title> Chat </title>

                <UTF8Meta />

                <link
                    href = '/Asset/Style.css'
                    rel = 'stylesheet'
                />

            </head>
            <body>

                <main>

                    <div class = 'Main' >

                        <h1 style = 'text-align:center' >
                            HTML Only Chat
                        </h1>

                        { ( hasCookies === 'Enabled' ) && <>

                            { ( hasSession ) ? <>

                                <iframe
                                    src = { `/Frame/Auth/Logout` }
                                    id = 'Logout'
                                />

                            </> : <>

                                <iframe
                                    src = { `/Frame/Auth/Login` }
                                    id = 'Login'
                                />

                            </> }

                        </> }


                        <div id = 'Chatting' >

                            <iframe
                                loading = 'lazy'
                                src = { `/Frame/Chat/Message/List` }
                                id = 'Messages'
                            />

                            { ( hasSession ) && <>

                                <iframe
                                    loading = 'lazy'
                                    height = '100%'
                                    width = '100%'
                                    src = { `/Frame/Chat/React/Selection` }
                                    id = 'Input'
                                />

                            </> }

                        </div>

                        { ( hasSession ) && <>

                            <iframe
                                loading = 'lazy'
                                height = { 70 }
                                src = { `/Frame/Chat/Message/Input` }
                                id = 'Input'
                            />

                        </> }

                    </div>

                    <div class = 'Sidebar' >

                        <div>
                            <div style = { `mask-image : url('/Asset/Icons/Login.png')` } />
                        </div>

                        <div>
                            <div style = { `mask-image : url('/Asset/Icons/Logout.png')` } />
                        </div>

                    </div>

                </main>

            </body>
        </html>
    </>
}
