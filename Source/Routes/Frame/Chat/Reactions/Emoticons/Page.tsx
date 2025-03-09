
export { Page }

import { Stylesheet } from 'Misc';
import { Emoticons } from './Emoticons.tsx'
import { Context } from 'Oak'


function Page ( 
    context : Context 
){

    const { request } = context

    const search = request.url.searchParams

    const groupId = search.get('Group')

    return <>
        <head>

            <Stylesheet path = 'Reset' />
            <Stylesheet path = 'Misc' />
            <Stylesheet path = 'Reactions/Emoticons' />

        </head>
        <body>

            { ( groupId ) && <Emoticons groupId = { groupId } /> }

        </body>
    </>
}
