
export { authenticateLogin }

import { comparePasswords } from '../../../Security/Hash.ts'
import { WithSession } from '../../Session.ts'
import { Credentials } from './mod.ts'
import { sessions } from '../../../State.ts'
import { database } from '../../../App.ts'
import { Account } from '../../../Types.ts'
import { Context } from 'Oak'
import { render } from 'Render'
import { Login } from '../../../Frames/Login.tsx'
import { UTF8Meta } from 'UI/Parts'


async function authenticateLogin (
    context : Context<Credentials & WithSession>
){

    const { sessionId , password , handle } = context.state


    const account = (await database.get<Account>([ 'Account_By_Handle' , handle ])).value

    if( ! account ){

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

        return
    }


    const password_bytes = new TextEncoder().encode(password)


    const isMatching = comparePasswords({
        password : password_bytes ,
        hashed : account.password ,
        salt : account.salt
    })


    if( ! isMatching ){
        context.response.status = 403
        context.response.body = JSON.stringify({
            problem : `Either the account doesn't exist or the given password is incorrect`
        })

        return
    }



    const session = sessions.get(sessionId)!

    session.accountId = account.accountId
    console.log('AccountId',sessionId,session,account.accountId)


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
