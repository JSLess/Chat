
import { Application } from 'Oak'
import { router } from './Routes/mod.ts'


const { debug , clear } = console


debug(`Starting HTML-Only Chat`)



const app = new Application({
    logErrors : false
})


app.use(router.routes())
app.use(router.allowedMethods())


app.addEventListener('error',( event ) => {

    event.stopImmediatePropagation()
    event.preventDefault()

    if( event.message === `connection closed before message completed` )
        return

    if( event.error instanceof Error ){

        if( event.error.message === `connection closed before message completed` )
            return
    }

    console.error(event)
})

await app.listen({ port : 8000 })

