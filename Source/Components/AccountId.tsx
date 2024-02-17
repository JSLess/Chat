
export type { Props as AccountIdProps }
export { Component as AccountId }

import { userById } from 'Database'


interface Props {
    userId : string
}


async function Component ( props : Props ){

    const user = await userById(props.userId)

    if( ! user.value )
        return

    return (
        <div class = 'AccountId' >

            <input
                id = 'AccountId'
                type = 'checkbox'
            />

            <label
                for = { 'AccountId' }
                style = {{ color : 'transparent' }}
                children = { String(user.value.accountId) }
            />

        </div>
    )
}
