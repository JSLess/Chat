
import { createAccount } from '../../Security/AccountId.ts'
import { database } from 'State'


const nick = 'Uwdmin'
const test_account = await createAccount()

await database.set([ 'User_By_Id' , test_account.userId ],{ nick })


console.debug(`Test Account`,test_account.accountId.toString())


