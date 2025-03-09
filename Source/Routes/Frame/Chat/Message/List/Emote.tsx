
export { Component as Emote }

import { IconType } from '../../../../../Reactions/Groups.ts'


interface Props {
    count : number
    icon : IconType
}


function Component ( props : Props ){

    const { count , icon } = props

    return (
        <div class = 'Emote' >

            <img src = { `/${ icon.file }` } />

            <span children = { count } />

        </div>
    )
}
