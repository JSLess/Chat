
export { InputFrame }

import { Stylesheet , apiUrl } from 'Misc'
import { BaseDocument } from 'Framework'


function InputFrame (){

    return (

        <BaseDocument

            header = {
                <Stylesheet path = 'MessageInputForm' />
            }

            body = {
                
                <form
                    encType = 'multipart/form-data'
                    action = { apiUrl('MessageInputForm') }
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
