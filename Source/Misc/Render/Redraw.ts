
export { redraw }

import { sessions } from 'State'


function redraw (){

    for ( const session of sessions.values() ){

        const connection = session.frames.messages

        connection?.write(`<meta http-equiv = refresh content = 0 />`)
        connection?.close()
    }
}
