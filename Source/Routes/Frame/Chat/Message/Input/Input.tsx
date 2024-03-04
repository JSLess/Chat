
export { Component as Input }


function Component (){

    return (

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
                required = { true }
                minLength = { 1 }
                maxLength = { 500 }
                name = 'message'
                type = 'text'
            />

        </form>
    )
}
