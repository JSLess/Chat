import { Groups } from "../../../../Reactions/Groups.ts";

export { Component as Page }



function Component (){

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
                href = '/Asset/Styles/Reactions/Window.css'
                rel = 'stylesheet'
            />

        </head>
        <body>

            <form
                action = '/API/Reactions'
                target = 'void'
                method = 'post'
                class = 'Header'
            >

                {/* <button
                    class = 'Square'
                    name = 'Edit-Favorites'
                /> */}

                <p> Reactions </p>

                {/* <button
                    class = 'Square'
                    name = 'Close'
                /> */}

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
