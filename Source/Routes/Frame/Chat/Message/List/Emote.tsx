
export { Emote }

import { IconType } from '../../../../../Reactions/Groups.ts'
import { Server } from 'Config'


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

            <img src = { `/Asset/${ icon.file }` } />

            <span>{ count }</span>

        </div>
    )
}
