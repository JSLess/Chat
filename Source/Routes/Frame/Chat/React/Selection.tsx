
export { middleware as routeReactSelection }

import { Reactions } from 'Dummy'
import { Context } from 'Oak'
import { render } from 'Render'


async function middleware ( context : Context ){


    const style = `

        form {
            cursor : default ;

            grid-template-columns : repeat( auto-fill , 64px ) ;
            display : grid ;
            gap : 10px ;
        }

        #reactions button {

            background-color : transparent ;
            background-size : contain ;
            outline : none ;
            cursor : pointer ;
            border : none ;
            color : transparent ;

            height : 64px ;
            width : 64px ;

            border-radius : 4px ;

            transition : 0.1s ;

            background-origin : content-box ;
            background-repeat : no-repeat ;

            padding : 3px ;
        }


        #reactions button:hover {
            background-color : #ffffff1a ;
        }

        ${ Array.from(Reactions.entries())
            .map(([ id , asset ]) => `[ value = '${ id }' ] { background-image : url(/Asset/Emote/${ asset }.png) ; }`)
            .join('') }
    `

    const buttons = Array
        .from(Reactions.keys())
        .map(( reaction ) => <button name = 'Emote' value = { reaction } /> )

    context.response.body = render(
        <html>
            <head>

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

                </form>

                </body>
            </html>
    )
}
