
export { Component as Page }

import { User } from './Types.ts'


interface Props {
    user : User
}


function Component ( props : Props ){

    return <>

        <h1 style = 'text-align:center'>
            HTML Only Chat
        </h1>

        <iframe
            allowFullScreen = { false }
            loading = 'lazy'
            src = { `/chat?userId=${ props.user.userId }` }
            id = 'Messages'
        />

        <iframe
            allowFullScreen = { false }
            loading = 'lazy'
            src = { `/input?userId=${ props.user.userId }` }
            id = 'Input'
            height = { 60 }
        />
    </>
}
