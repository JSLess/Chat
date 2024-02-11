
export { isValidUsername }


const Username = {
    pattern : /^[a-zA-Z0-9][a-zA-Z0-9_-]+[a-zA-Z0-9]$/ ,
    minimum : 3 ,
    maximum : 20
}



function isValidUsername ( username : string ){

    const { length } = username

    if( length > Username.maximum )
        return {
            success : false ,
            problem :
                `The username is too long, should be between ` +
                `${ Username.minimum } - ${ Username.maximum }`
        }

    if( length < Username.minimum )
        return {
            success : false ,
            problem :
                `The username is too short, should be between ` +
                `${ Username.minimum } - ${ Username.maximum }`
        }

    if( Username.pattern.test(username) )
        return {
            success : false ,
            problem :
                `The username contains invalid characters, It ` +
                `should only start and end with a-Z and 0-9 ` +
                `and can contain underscore and dash in-between`
        }

    return { success : true }
}

