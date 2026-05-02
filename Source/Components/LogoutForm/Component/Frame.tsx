
export { LogoutFrame }

import { BaseDocument } from 'Framework'
import { Stylesheet } from 'Misc'
import { API } from '../../../Routes/API/Routes.ts';


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
