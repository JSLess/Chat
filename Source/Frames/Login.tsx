
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
                target = '_parent'
                action = '/Login'
                method = 'post'
                id = 'Login'
            >

                <div class = 'Form_Input' >

                    <input
                        required = { true }
                        name = 'handle'
                        type = 'text'
                    />

                    <div/>

                    <label> Handle </label>

                </div>

                <div class = 'Form_Input' >

                    <input
                        required = { true }
                        name = 'password'
                        type = 'password'
                    />

                    <div/>

                    <label> Password </label>

                </div>

                <input
                    value = 'Login'
                    type = 'submit'
                />

            </form>

        </div>
    )
}
