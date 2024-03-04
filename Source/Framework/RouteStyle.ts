
export { routeStyle }

import { onlySameSite } from '../Routes/Asset/SameSite.ts';
import { Context } from 'Oak';



interface Props {
    meta : ImportMeta
    file : string
}


function routeStyle ( props : Props ){

    return [ onlySameSite , async ( context : Context ) => {

        const { response } = context

        try {

            await context.send({
                root : props.meta.dirname! ,
                path : props.file
            })

        } catch {
            response.status = 404
        }

    }] as const
}
