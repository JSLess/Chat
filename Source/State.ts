
export { messages , users }

import type { Message , User } from './Types.ts'


const messages = new Map<string,Message>
const users = new Map<string,User>
