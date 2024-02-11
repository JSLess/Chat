
export { authenticateLogin }

import { WithSession } from '../../Session.ts'
import { Credentials } from './mod.ts'
import { sessions } from '../../../State.ts'
import { database } from '../../../App.ts'
import { Account } from '../../../Types.ts'
import { Context } from 'Oak'
import { render } from 'Render'
import { Login } from '../../../Frames/Login.tsx'
import { UTF8Meta } from 'UI/Parts'
import { createAccount } from "../../../Security/AccountId.ts";


async function authenticateLogin (
    context : Context<Credentials & WithSession>
){

    const { accountId , sessionId } = context.state

    const id = BigInt(accountId)

    const account = await database.get([ 'Account_By_Id' , id ])

    console.log('AccountId',accountId,id)

    if( ! account.value ){

        context.response.status = 400

        context.response.body = render(
            <>
                <html>
                    <head>

                        <UTF8Meta />

                        <link
                            href = '/Assets/Login.css'
                            rel = 'stylesheet'
                        />

                    </head>
                    <body>
                        <Login
                            notices = {[{
                                title : 'Missing Handle' ,
                                description : `Either the account doesn't exist or the given password is incorrect`
                            }]}
                        />
                    </body>
                </html>
            </>
        )

        context.response.redirect('/')

        return
    }


    const session = sessions.get(sessionId)!
    session.accountId = accountId

    console.log('AccountId',sessionId,session,accountId)


    context.response.headers.set('Cache-Control','no-cache="Set-Cookie"')

    await context.cookies.set('Session',sessionId,{
        httpOnly : true ,
        secure : false ,
        sameSite : true ,
        path : '/' ,
        expires : new Date(Date.now() + 1000 * 60 * 20)
    })

    context.response.body = `
        <html>
            <body>
                <p> Redirecting ... </p>
            </body>
        </html>
    `

    context.response.redirect('/')
}
