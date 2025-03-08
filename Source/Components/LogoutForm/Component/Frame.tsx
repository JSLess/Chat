
export { LogoutFrame }

import { Stylesheet , apiUrl } from 'Misc'
import { BaseDocument } from 'Framework'


function LogoutFrame (){

    return (

        <BaseDocument

            name = 'LogoutForm'
            
            header = {
                <Stylesheet path = 'Frame' />
            }

            body = {

                <form
                    action = { apiUrl('LogoutForm') }
                    target = '_parent'
                    method = 'post'
                    id = 'Logout'
                >

                    <input
                        value = 'Logout'
                        type = 'submit'
                    />

                </form>
            }
        />
    )
}
