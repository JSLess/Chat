
export type { BaseDocumentArgs }
export { BaseDocument }

import { ComponentChild } from 'preact'
import { UTF8Meta } from 'UI/Parts'
import { Stylesheet } from 'Misc';


interface BaseDocumentArgs {
    
    children ?: ComponentChild
    name : string
    
    header ?: ComponentChild
    body ?: ComponentChild
}


function BaseDocument ( 
    args : BaseDocumentArgs 
){

    const { children , header , body , name } = args

    return (
        <html>
            <head>

                <UTF8Meta />

                <Stylesheet path = 'Reset' />
                <Stylesheet path = { name } />

                { header }

            </head>
            <body>
                { children }
                { body }
            </body>
        </html>
    )
}
