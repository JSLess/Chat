
export { InputFrame }

import { BaseDocument } from 'Framework'
import { Stylesheet } from 'Misc'
import { API } from '../../../Routes/API/Routes.ts'


function InputFrame (){

    return (

        <BaseDocument

            header = {
                <Stylesheet path = 'MessageInputForm' />
            }

            body = {

                <form
                    encType = 'multipart/form-data'
                    action = { API.MessageInputForm }
                    target = '_self'
                    method = 'post'
                    id = 'Input'
                >

                    <input

                        maxLength = { 500 }
                        minLength = { 1 }

                        placeholder = 'Message'
                        name = 'message'
                        type = 'text'

                        spellcheck
                        autofocus
                        required
                    />

                </form>
            }
        />
    )
}
