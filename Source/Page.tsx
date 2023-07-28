
export { Component as Page }

import { User } from './Types.ts'



interface Props {
    user : User
}
function Component ( props : Props ){

    return <>

        <iframe
            loading = 'eager'
            src = { `/chat?userId=${ props.user.userId }` }
            id = 'Messages'
        />

        <iframe name = 'void' />

        <form
            encType = 'multipart/form-data'
            target = 'void'
            action = '/post'
            method = 'post'
        >

            <input
                value = { props.user.userId }
                type = 'hidden'
                name = 'userId'
            />

            <textarea
                placeholder = 'Message'
                required = { true }
                name = 'message'
            />

            <button> Post </button>

        </form>
    </>
}
