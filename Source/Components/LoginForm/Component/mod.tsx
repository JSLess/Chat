
export { Component as Login }


interface Notice {
    description : string
    title : string
}


interface Props {
    notices : Array<Notice>
}


function Component ( props : Props ){

    return (

        <div>

            { props.notices.map(( notice ) => (

                <div>

                    <h3> { notice.title } </h3>

                    <p> { notice.description } </p>

                </div>
            )) }

            <form
                autocomplete = 'on'
                target = '_parent'
                action = '/API/LoginForm'
                method = 'post'
                id = 'Login'
            >

                <input
                    autocomplete = 'current-password'
                    placeholder = '0000 0000 0000 0000'
                    inputmode = 'numeric'
                    minlength = { 16 }
                    maxlength = { 16 }
                    required = { true }
                    pattern = '\d{16}'
                    type = 'password'
                    name = 'Account'
                    size = { 19 }
                />

                <label> Account Id </label>

                <input
                    value = 'Login'
                    type = 'submit'
                />

            </form>

        </div>
    )
}
