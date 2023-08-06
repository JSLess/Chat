
export { Component as Input }


function Component (){

    return (

        <form
            encType = 'multipart/form-data'
            target = '_self'
            action = '/Chat/Input/Post'
            method = 'post'
            id = 'Input'
        >

            <input
                placeholder = 'Message'
                spellCheck = { true }
                required = { true }
                minLength = { 1 }
                maxLength = { 500 }
                name = 'message'
                type = 'text'
            />

        </form>
    )
}
