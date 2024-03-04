
export { Component as Page }

import { Emoticons } from './Emoticons.tsx'
import { Context } from 'Oak'


function Component ( context : Context ){

    const search = context.request.url.searchParams

    const groupId = search.get('Group')

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
                href = '/Asset/Styles/Reactions/Emoticons.css'
                rel = 'stylesheet'
            />

        </head>
        <body>

            { ( groupId ) && <Emoticons groupId = { groupId } /> }

        </body>
    </>
}
