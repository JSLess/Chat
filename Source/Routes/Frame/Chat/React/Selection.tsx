
export { middleware as routeReactSelection }

import { AsyncResponse } from 'Misc/Async'
import { Reactions } from 'Dummy'
import { Context } from 'Oak'
import { render } from 'Render'


// Idea : Inject autofocused inputs when typing any character into field

async function middleware (
    context : Context
){


    const style = `
        ${ Array.from(Reactions.entries())

    .map(([ id , asset ]) => `

        [ value = '${ id }' ] {
            background-image : url(/Asset/Emote/${ asset }.png) ;
        }

        [ value = '${ id }' ]:active ~ label {
            cursor : url(/Asset/Emote/${ asset }.png) , auto ;
        }

        `)
            .join('') }
    `

    const buttons = Array
        .from(Reactions.keys())
        .map(( reaction ) => <button name = 'Emote' value = { reaction } /> )

    const hoverStyles = Array
        .from(Reactions.entries())

            .map(([ reactionId ]) => `
                [ value = '${ reactionId }' ]:active::before {
                    list-style-image : url('/API/Spark?Scope=Reactions:Editing&Action=Drag&Reaction=${ reactionId }&Time=${ Date.now() }') ;
                }
            ` )
        .join('')


    const rendered = render(
        <html>
            <head>

                <link
                    href = '/Asset/Emoticons.css'
                    rel = 'stylesheet'
                />

            </head>
            <body>

                <form
                    action = '/API/Chat/Message/React/Toggle'
                    target = 'void'
                    method = 'post'
                    id = 'reactions'
                >

                    { buttons }

                    <style dangerouslySetInnerHTML = {{ __html : style }} />

                    <div class = 'Category' />

                    <style dangerouslySetInnerHTML = {{ __html : `

                        .Category:hover::before {
                            list-style-image : url('/API/Spark?Scope=Reactions:Editing&Action=Hover&Time=${ Date.now() }') ;
                        }

                    ` }} />

                </form>

                </body>
            </html>

    ) + `<style>${ hoverStyles }</style>`


    const { response , state } = context

    const { session } = state

    const { headers } = response

    headers.set('Content-Type','text/html;charset=utf-8')
    headers.set('Transfer-Encoding','chunked')
    headers.set('Connection','keep-alive')
    headers.set('Keep-Alive',`timeout=${ 60 * 60 }`)

    session.frames.reactions = new AsyncResponse

    response.body = session.frames.reactions.readable
    session.frames.reactions.write(rendered)
}
