
export { Component as Frame }

import { BaseDocument } from 'Framework'


function Component (){

    return (
        <BaseDocument
            name = 'RegisterForm'
        >

            <form
                target = '_parent'
                action = '/API/RegisterForm'
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
