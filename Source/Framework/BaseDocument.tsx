
export type { BaseDocumentArgs }
export { BaseDocument }

import { ComponentChild } from 'preact'
import { UTF8Meta } from 'UI/Parts'
import { Stylesheet } from 'Misc';


interface BaseDocumentArgs {
    children : ComponentChild
    name : string
}


function BaseDocument ( 
    args : BaseDocumentArgs 
){

    const { children , name } = args

    return (
        <html>
            <head>

                <UTF8Meta />

                <Stylesheet path = 'Reset' />
                <Stylesheet path = { name } />

            </head>
            <body>
                { children }
            </body>
        </html>
    )
}
