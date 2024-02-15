
export { Component as Form }



function Component (){

    return (

        <div>

            {/* <iframe name="dummyframe" id="dummyframe" style="display: none"></iframe> */}

            <form
                target = '_parent'
                action = '/API/Auth/Register'
                method = 'post'
                id = 'Register'
            >

                <input
                    value = 'Create'
                    type = 'submit'
                />

            </form>

        </div>
    )
}
