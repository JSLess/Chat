
export type { Props as BaseDocumentProps }
export { Component as BaseDocument }

import { ComponentChild } from 'Preact'
import { UTF8Meta } from 'UI/Parts'


interface Props {
    children : ComponentChild
    name : string
}


function Component ( props : Props ){

    const { children , name } = props

    return (
        <html>
            <head>

                <UTF8Meta />

                <link
                    href = '/Asset/Styles/Reset.css'
                    rel = 'stylesheet'
                />

                <link
                    href = { `/Asset/Styles/${ name }.css` }
                    rel = 'stylesheet'
                />

            </head>
            <body children = { children } />
        </html>
    )
}
