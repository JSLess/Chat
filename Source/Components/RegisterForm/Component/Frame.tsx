
export { RegisterFrame }

import { Stylesheet , apiUrl } from 'Misc'
import { BaseDocument } from 'Framework'


function RegisterFrame (){

    return (
        <BaseDocument

            header = {
                <Stylesheet path = 'RegisterForm' />
            }
            
            body = {
                <form
                    action = { apiUrl('RegisterForm') }
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
