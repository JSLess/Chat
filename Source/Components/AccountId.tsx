
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
                children = { String(user.value.accountId) }
                style = {{ color : 'transparent' }}
                for = { 'AccountId' }
            />

        </div>
    )
}
