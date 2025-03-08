
export { RegisterFrame }

import { BaseDocument } from 'Framework'
import { apiUrl } from 'Misc'


function RegisterFrame (){

    return (
        <BaseDocument
            name = 'RegisterForm'
        >

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

        </BaseDocument>
    )
}
