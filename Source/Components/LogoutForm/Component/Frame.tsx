
export { LogoutFrame }

import { BaseDocument } from 'Framework'
import { Stylesheet } from 'Misc'
import { API } from 'API/Routes';


function LogoutFrame (){

    return (

        <BaseDocument

            header = {
                <>
                    <Stylesheet path = 'Frame' />
                    <Stylesheet path = 'LogoutForm' />
                </>
            }

            body = {

                <form
                    action = { API.LogoutForm }
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
