
export { Component as Input }

import { BaseDocument } from '../../../Framework/BaseDocument.tsx'


function Component (){

    return (

        <BaseDocument
            name = 'MessageInputForm'
        >

            <form
                encType = 'multipart/form-data'
                action = '/API/Chat/Message/Send'
                target = '_self'
                method = 'post'
                id = 'Input'
            >

                <input
                    placeholder = 'Message'
                    spellCheck = { true }
                    autofocus = { true }
                    maxLength = { 500 }
                    minLength = { 1 }
                    required = { true }
                    name = 'message'
                    type = 'text'
                />

            </form>

        </BaseDocument>

    )
}
