
export { Page }

import { Stylesheet } from 'Misc';
import { Groups } from '../../../../Reactions/Groups.ts'
import { API } from '../../../API/Routes.ts'


function Page (){

    return <>
        <head>

            <Stylesheet path = 'Reset' />
            <Stylesheet path = 'Misc' />
            <Stylesheet path = 'Reactions/Window' />

        </head>
        <body>

            <form
                action = { API.Reactions.Query }
                target = 'void'
                method = 'post'
                class = 'Header'
            >

                <button
                    class = 'Square'
                    name = 'Edit-Favorites'
                />

                <p> Reactions </p>

            </form>

            <iframe
                loading = 'lazy'
                src = { `/Frame/Chat/Reactions/Emoticons?Group=${ Groups.at(0)?.id ?? '' }` }
                id = 'Emoticons'
            />

            <iframe
                loading = 'lazy'
                src = { `/Frame/Chat/Reactions/Groups` }
                id = 'Groups'
            />

        </body>
    </>
}
