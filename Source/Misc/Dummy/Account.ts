
import { createAccount } from '../../Security/AccountId.ts'


const test_account = await createAccount()

console.debug(`Test Account`,test_account.accountId.toString())


