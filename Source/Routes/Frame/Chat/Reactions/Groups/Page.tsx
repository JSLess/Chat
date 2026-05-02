
export { Page }

import { Stylesheet , CSS } from 'Misc'
import { Groups } from '../../../../../Reactions/Groups.ts'
import { API } from '../../../../API/Routes.ts'


function Page (){

    const style = Groups
        .map(( group ) => `

            [ data-group = '${ group.id }' ]{
                ---Tint : ${ group.tint } ;
            }

            [ data-group = '${ group.id }' ] span:first-child {
                background-image : url('/${ group.preview }') ;
            }
        `)
        .join('')

    return <>
        <head>

            <Stylesheet path = 'Reset' />
            <Stylesheet path = 'Misc' />
            <Stylesheet path = 'Reactions/Groups' />

            <CSS content = { style } />

        </head>
        <body>

            <form
                action = { API.Reactions.Groups.Query }
                target = 'void'
                method = 'post'
                class = 'List'
            >

                { Groups.map(( group ) => (

                    <button
                        data-group = { group.id }
                        class = 'Group'
                        name = 'Group'
                        value = { group.id }
                    >
                        <span />
                        <span>{ group.name }</span>
                    </button>

                )) }

            </form>

        </body>
    </>
}
