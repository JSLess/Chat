
export { Component as Page }

import { Groups } from "../../../../../Reactions/Groups.ts";


function Component (){

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

            <link
                href = '/Asset/Styles/Reset.css'
                rel = 'stylesheet'
            />

            <link
                href = '/Asset/Styles/Misc.css'
                rel = 'stylesheet'
            />

            <link
                href = '/Asset/Styles/Reactions/Groups.css'
                rel = 'stylesheet'
            />

            <style dangerouslySetInnerHTML = {{ __html : style }} />

        </head>
        <body>

            <form
                action = '/API/Reactions/Groups'
                target = 'void'
                method = 'post'
                class = 'List'
            >

                {/* <button
                    data-group = 'Favorites'
                    children = 'Favorites'
                    class = 'Group'
                    name = 'Group'
                    value = 'Favorites'
                /> */}

                { Groups.map(( group ) => (

                    <button
                        data-group = { group.id }
                        class = 'Group'
                        name = 'Group'
                        value = { group.id }
                    >
                        <span />
                        <span children = { group.name } />
                    </button>

                )) }

            </form>

        </body>
    </>
}
