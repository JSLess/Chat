
export { Component as Page }

import { RegisterForm , LogoutForm , LoginForm } from 'UI/Parts'
import { AccountId , UTF8Meta } from 'UI/Parts'
import { MessageInputForm } from '../../../Components/MessageInputForm/mod.ts'
import { BaseState } from '../../State.ts'
import { Button } from '../../../Frames/Button/mod.ts'


type Props = BaseState


async function Component (
    props : Props
){

    const { hasSession , hasCookies } = props

    return <>

        <html>
            <head>

                <title> Chat </title>

                <UTF8Meta />

                <link
                    href = '/Asset/Styles/Reset.css'
                    rel = 'stylesheet'
                />

                <link
                    href = '/Asset/Styles/Style.css'
                    rel = 'stylesheet'
                />

            </head>
            <body>

                <main>

                    <div class = 'Main' >

                        { ( hasSession ) && <>

                            <div style = {{
                                gridAutoFlow : 'column' ,
                                columnGap : '0.5rem' ,
                                display : 'grid'
                            }} >

                                <Button
                                    onClick = { ( args ) => console.warn(`Button`,args) }
                                    icon = 'Reaction'
                                    uuid = 'Reaction-Button'
                                />

                                <Button
                                    onClick = { ( args ) => console.warn(`Button`,args) }
                                    icon = 'Context'
                                    uuid = 'Reaction-Button'
                                />

                            </div>

                        </> }

                        { ( hasCookies === 'Enabled' ) && <>

                            { ( hasSession ) ? <>

                                <div id = 'LoggedIn' >

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

                            <MessageInputForm
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
