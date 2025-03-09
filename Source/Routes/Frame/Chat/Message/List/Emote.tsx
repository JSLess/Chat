
export { Emote }

import { IconType } from '../../../../../Reactions/Groups.ts'


interface EmoteArgs {
    count : number
    icon : IconType
}


function Emote ( 
    args : EmoteArgs 
){

    const { count , icon } = args

    return (
        <div class = 'Emote' >

            <img src = { `/${ icon.file }` } />

            <span>{ count }</span>

        </div>
    )
}
