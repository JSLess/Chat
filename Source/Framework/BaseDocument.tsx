
export type { BaseDocumentArgs }
export { BaseDocument }

import { ComponentChild } from 'preact'
import { Stylesheet } from 'Misc'
import { UTF8Meta } from 'UI/Parts'


interface BaseDocumentArgs {
    header ?: ComponentChild
    body : ComponentChild
}


function BaseDocument (
    args : BaseDocumentArgs
){

    const { header , body } = args

    return (
        <html>
            <head>

                <UTF8Meta />

                <Stylesheet path = 'Reset' />

                { header }

            </head>
            <body>
                { body }
            </body>
        </html>
    )
}
