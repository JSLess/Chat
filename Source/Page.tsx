
export { Component as Page }

import { User } from './Types.ts'



interface Props {
    user : User
}
function Component ( props : Props ){

    return <>

        <iframe
            allowFullScreen = { false }
            loading = 'lazy'
            src = { `/chat?userId=${ props.user.userId }` }
            id = 'Messages'
        />
    </>
}
