
export { Page }

import { 
    MessageInputForm , RegisterForm , 
    LogoutForm , LoginForm , AccountId 
} from 'UI/Parts'

import { Stylesheet , CSS } from 'Misc'
import { BaseDocument } from 'Framework'
import { BaseState } from 'Routes/State'
import { Button } from 'Frames'


type PageArgs = BaseState


async function Page (
    args : PageArgs
){

    const { hasSession , hasCookies } = args

    return (

        <BaseDocument

            header = {
                <>
                    <title> Chat </title>
                
                    <Stylesheet path = 'Style' />
                </>
            }

            body = {

                <>
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
                                        uuid = 'Reaction-Button'
                                        icon = 'Reaction'
                                    />

                                    <Button
                                        onClick = { ( args ) => console.warn(`Button`,args) }
                                        uuid = 'Reaction-Button'
                                        icon = 'Context'
                                    />

                                </div>

                            </> }

                            { ( hasCookies === 'Enabled' ) && <>

                                { ( hasSession ) ? <>

                                    <div id = 'LoggedIn' >

                                        <LogoutForm
                                            id = 'Logout'
                                        />

                                        { await AccountId({ userId : args.session.userId! }) }

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

                        <CSS content = { `
                                
                            #Overlay:active {
                                list-style-image : url('${ '/API/Spark' }?${ new URLSearchParams({ Scope : 'General:Overlay' , Action : 'Click' , Time : String(Date.now()) }).toString() }') ;
                            }

                        ` } />

                        </> 
                    }
                </>
            }
        />
    )
}
