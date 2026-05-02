
export { API }


const API = {

    MessageInputForm : '/API/MessageInputForm' ,
    RegisterForm : '/API/RegisterForm' ,
    LogoutForm : '/API/LogoutForm' ,
    LoginForm : '/API/LoginForm' ,

    Reactions : {

        Query : '/API/Reactions' ,

        Groups : {
            Query : '/API/Reactions/Groups'
        }
    },

    Spark : '/API/Spark' ,

    Chat : {

        React : '/API/Chat/React' ,

        Message : {
            Select : '/API/Chat/Message/Select'
        }
    }
}
