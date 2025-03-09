
export type { IconArgs }
export { Icon }

import { readIconAsDataURI } from 'Misc'


interface IconArgs {
    name : string
}


function Icon (
    args : IconArgs 
){

    const { name } = args

    const uri = readIconAsDataURI(name)

    return (
        <img src = { uri } />
    )
}
