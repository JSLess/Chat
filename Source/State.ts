
export { messages , sessions , users }

import type { Message , Session , User } from './Types.ts'


const messages = new Map<string,Message>
const sessions = new Map<string,Session>
const users = new Map<string,User>
