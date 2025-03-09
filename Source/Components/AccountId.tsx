
export type { AccountIdProps }
export { AccountId }

import { userById } from 'Database'


interface AccountIdProps {
    userId : string
}


async function AccountId ( 
    args : AccountIdProps 
){

    const { userId } = args

    const user = await userById(userId)

    if( ! user.value )
        return

    const { accountId } = user.value

    return (
        <div class = 'AccountId' >

            <input
                type = 'checkbox'
                id = 'AccountId'
            />

            <label
                style = {{ color : 'transparent' }}
                for = 'AccountId'
            >{ accountId }</label>

        </div>
    )
}
