
import { createAccount } from '../../Security/AccountId.ts'
import { database } from 'State'


const nick = 'Uwdmin'
const test_account = await createAccount()
console.debug(`Test Account`,test_account)

await database.set([ 'User_By_Id' , test_account.userId ],{ nick })
