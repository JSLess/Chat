
export type { EmoticonsArgs }
export { Emoticons }

import { Groups } from '../../../../../Reactions/Groups.ts'
import { CSS } from 'Misc'
import { API } from '../../../../API/Routes.ts';


interface EmoticonsArgs {
    groupId : string
}


function Emoticons (
    args : EmoticonsArgs
){

    const { groupId } = args

    const group = Groups
        .find(( group ) => group.id === groupId )

    if( ! group )
        return null

    const emoticons = group.Icon.map(( icon ) => (

        <div data-reaction = { icon.id } >
            <img
                height = { 32 }
                width = { 32 }
                src = { `/${ icon.file }` }
            />
        </div>
    ))

    const style = group.Icon.map(( icon ) => `

        [ data-reaction = '${ icon.id }' ]:active {
            list-style-image : url('${ API.Spark }?Scope=Reactions:Use&Action=Click&Reaction=${ icon.id }&Time=${ Date.now() }') ;
        }

    `).join('')

    return <>

        <div class = 'List' >
            { emoticons }
        </div>

        <CSS content = { style } />
    </>
}
