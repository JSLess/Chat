
export { InputFrame }

import { BaseDocument } from 'Framework'
import { apiUrl } from 'Misc'


function InputFrame (){

    return (

        <BaseDocument
            name = 'MessageInputForm'
            
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

                        spellCheck
                        autofocus
                        required
                    />

                </form>
            }
        />
    )
}
