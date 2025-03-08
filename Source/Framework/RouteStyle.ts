
export type { RouteStyleArgs }
export { routeStyle }

import { onlySameSite } from '../Routes/Asset/SameSite.ts'
import { Context } from 'Oak'
import { Status } from 'Misc'


interface RouteStyleArgs {
    meta : ImportMeta
    file : string
}


function routeStyle ( 
    props : RouteStyleArgs 
){

    const { meta , file } = props

    const sendFile = async ( 
        context : Context 
    ) => {

        const { response } = context

        await context.send({
            root : meta.dirname! ,
            path : file
        }).catch(() => {
            response.status = Status.NotFound
        })
    }

    return [ onlySameSite , sendFile ] as const
}
