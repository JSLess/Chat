
export { Component as Emote }

import { Icon } from '../../../../../Reactions/Groups.ts'


interface Props {
    count : number
    icon : Icon
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
