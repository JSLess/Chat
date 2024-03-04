
export { Component as Page }

import { RegisterForm , LogoutForm , LoginForm } from 'UI/Parts'
import { AccountId , UTF8Meta } from 'UI/Parts'
import { BaseState } from "../../State.ts"


type Props = BaseState


async function Component ( props : Props ){

    const { hasSession , hasCookies } = props

    return <>

        <html>
            <head>

                <title> Chat </title>

                <UTF8Meta />

                <link
                    href = '/Asset/Styles/Style.css'
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

                                <div id = 'LoggedIn'>

                                    <LogoutForm
                                        id = 'Logout'
                                    />

                                    { await AccountId({ userId : props.session.userId! }) }

                                </div>

                            </> : <>

                                <div id = 'Auth' >

                                    <RegisterForm
                                        id = 'Register'
                                    />

                                    <b> or </b>

                                    <LoginForm
                                        id = 'Login'
                                    />

                                </div>

                            </> }

                        </> }


                        { ( hasSession ) && <>

                            <iframe
                                loading = 'lazy'
                                src = { `/Frame/Chat/Message/Input` }
                                id = 'Input'
                            />

                            <div id = 'Chatting' >

                                <iframe
                                    loading = 'lazy'
                                    src = { `/Frame/Chat/Message/List` }
                                    id = 'Messages'
                                />

                                <iframe
                                    loading = 'lazy'
                                    src = { `/Frame/Chat/Reactions` }
                                    id = 'Reactions_Window'
                                />

                            </div>

                        </> }

                    </div>

                </main>

                { ( hasSession ) && <>

                    <div id = 'Overlay' />

                    <style dangerouslySetInnerHTML = {{ __html : `

                        #Overlay:active {
                            list-style-image : url('/API/Spark?Scope=General:Overlay&Action=Click&Time=${ Date.now() }') ;
                        }

                    `}} />

                </> }

            </body>
        </html>
    </>
}
