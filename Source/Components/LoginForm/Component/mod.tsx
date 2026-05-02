
export { Login }

import { API } from '../../../Routes/API/Routes.ts'


interface LoginArgs {
    notices : Array<Notice>
}

interface Notice {
    description : string
    title : string
}


function Login (
    args : LoginArgs
){

    return (

        <div>

            { args.notices.map(( notice ) => (

                <div>

                    <h3> { notice.title } </h3>

                    <p> { notice.description } </p>

                </div>
            )) }

            <form
                autocomplete = 'on'
                target = '_parent'
                action = { API.LoginForm }
                method = 'post'
                id = 'Login'
            >

                <input

                    minlength = { 16 }
                    maxlength = { 16 }
                    size = { 19 }

                    autocomplete = 'current-password'
                    placeholder = '0000 0000 0000 0000'
                    inputmode = 'numeric'
                    pattern = '\d{16}'
                    type = 'password'
                    name = 'Account'

                    required
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
