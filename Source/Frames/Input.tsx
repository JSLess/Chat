
export { Component as Input }

import { User } from '../Types.ts'


interface Props {
    user : User
}


function Component ( props : Props ){

    return (

        <form
            encType = 'multipart/form-data'
            target = '_self'
            action = '/post'
            method = 'post'
            id = 'Input'
        >

            <input
                value = { props.user.userId }
                type = 'hidden'
                name = 'userId'
            />

            <input
                placeholder = 'Message'
                spellCheck = { true }
                required = { true }
                name = 'message'
                type = 'text'
            />

        </form>
    )
}
