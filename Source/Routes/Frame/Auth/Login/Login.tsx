
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
                action = '/API/Auth/Login'
                method = 'post'
                id = 'Login'
            >

                <div class = 'Form_Input' >

                    <input
                        required = { true }
                        autocomplete = 'current-password'
                        name = 'Account'
                        type = 'password'
                        minlength={16}
                        maxlength={16}
                        size = {19}
                        pattern = '\d{16}'
                        inputmode = 'numeric'
                        placeholder = '0000 0000 0000 0000'
                    />

                    <div/>

                    <label> Account Id </label>

                </div>

                <input
                    value = 'Login'
                    type = 'submit'
                />

            </form>

        </div>
    )
}
