
export * from './State.ts'
export { router }

export { 
    determineSession , 
    determineCookies , 
    recheckCookies ,
    checkCookies , 
    initState 
}


import {
    determineSession , determineCookies , onlyWithCookies , 
    initState , recheckCookies , onlyAllowDocuments , checkCookies , 
    onlyFrames , onlySessions , onlyAuthenticated
} from 'Misc/Routes'

import {
    message_input_form_router ,
    register_form_router ,
    logout_form_router ,
    login_form_router
} from 'UI/Parts'

import { AssetService } from 'Services'
import { handlePing } from '../Misc/Ping.ts'
import { routeHome } from './Page/Home/Home.ts'
import { Server } from 'Config'
import { Router } from 'Oak'
import { frame } from './Frame/mod.ts'
import { Pages } from 'Misc'
import { page } from './Page/mod.ts'
import { api } from './API/mod.ts'


const router = new Router

// router.use( async ( context , next ) => {
    
//     const host = context.request.url.hostname
    
//     const bits = host.split('.')

//     const keep = bits.length - Server.Host.split('.').length

//     const subs = bits.slice(0,keep)
//     console.debug('Subdomains',host,subs,context.request.url)

//     if( subs.length === 0 )
//         return next()


//     const [ service ] = subs

//     switch ( service ){
//     case 'asset' :
//         await AssetService.route(context)
//     }
// })

router.get('/Asset/:path+',async ( context ) => {

    await AssetService.route(context)

    // const { response , request } = context

    // const url = new URL(request.url)

    // url.hostname = `asset.${ url.hostname }`

    // url.pathname = url.pathname.slice(`/Asset`.length)

    // response.redirect(url.href)

    // next()
})


router.use(register_form_router.routes())
router.use(register_form_router.allowedMethods())

router.use(logout_form_router.routes())
router.use(logout_form_router.allowedMethods())

router.use(login_form_router.routes())
router.use(login_form_router.allowedMethods())

router.use(message_input_form_router.routes())
router.use(message_input_form_router.allowedMethods())

router.get( Pages.Home ,
    onlyAllowDocuments ,
    checkCookies ,
    initState ,
    determineSession ,
    determineCookies ,
    recheckCookies ,
    routeHome
)


router.use( '/Frame' ,
    onlyFrames ,
    initState ,
    determineSession ,
    determineCookies ,
    onlyWithCookies ,
    frame.routes()
)

router.use( '/Page' ,
    onlyAllowDocuments ,
    checkCookies ,
    initState ,
    determineSession ,
    determineCookies ,
    recheckCookies ,
    page.routes()
)

router.use( '/API' ,
    initState ,
    determineSession ,
    determineCookies ,
    onlyWithCookies ,
    api.routes()
)

router.get( '/Ping' ,
    initState ,
    determineSession ,
    determineCookies ,
    onlyWithCookies ,
    onlySessions ,
    onlyAuthenticated ,
    handlePing
)

