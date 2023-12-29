
export { Component as Favicon }

import Favicon from './Data.ts'


function Component (){
    return (
        <link
            href = { Favicon }
            type = 'image/x-icon'
            rel = 'icon'
        />
    )
}
