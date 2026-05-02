
export { Emote }

import { IconType } from '../../../../../Reactions/Groups.ts'


interface Args {
    count : number
    icon : IconType
}


function Emote ({
    count , icon
} : Args ){

    return (
        <div class = 'Emote' >

            <img src = { `/Asset/${ icon.file }` } />

            <span>{ count }</span>

        </div>
    )
}
