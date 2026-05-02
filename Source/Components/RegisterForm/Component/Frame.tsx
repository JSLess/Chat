
export { RegisterFrame }

import { BaseDocument } from 'Framework'
import { Stylesheet } from 'Misc'
import { API } from '../../../Routes/API/Routes.ts';


function RegisterFrame (){

    return (
        <BaseDocument

            header = {
                <Stylesheet path = 'RegisterForm' />
            }

            body = {
                <form
                    action = { API.RegisterForm }
                    target = '_parent'
                    method = 'post'
                    id = 'Register'
                >

                    <input
                        value = 'Create'
                        type = 'submit'
                    />

                </form>
            }
        />
    )
}
