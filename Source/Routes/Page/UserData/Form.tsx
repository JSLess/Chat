
export { Route as UserDataRoute }

import { UTF8Meta } from 'UI/Parts'
import { Context } from 'Oak'
import { JSX } from 'preact/jsx-runtime'


async function toArray < Type > ( iterable : AsyncIterable<Type> ){

    const array = new Array<Type>

    for await ( const item of iterable )
        array.push(item)

    return array
}

async function Route ( context : Context ){

    const entries = context.cookies.entries()

    const map = new Map(await toArray(entries))

    const list = new Array<JSX.Element>


    if( map.has('Session') ){

        list.push(
            <>
                <section>

                    <h2> Session Identifier </h2>

                    <p> This value identifies your current browser session as you. </p>

                    <div> Name : <code> Session </code> </div>

                    <div> Data : <code> { map.get('Session') } </code> </div>

                </section>
            </>
        )

        map.delete('Session')
    }


    const other = Array
        .from(map.entries())
        .map(([ key ,value ]) => (
            <li> { key } : { value } </li>
        ))


    if( other.length )
        list.push(
            <>

                <section>

                    <h2> Other Cookies </h2>

                    <ul children = { other } />

                </section>

            </>
        )


    return (
        <html>
            <head>

                <UTF8Meta />

                <link
                    href = '/Asset/UserData.css'
                    rel = 'stylesheet'
                />

            </head>
            <body>

                <h1 style = 'margin-bottom:0rem' > Cookies </h1>

                <p> Data that is temporarily saved in your browser. </p>

                { list }

            </body>
        </html>
    )
}
