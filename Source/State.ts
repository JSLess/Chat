
export { messages , sessions }

import type { Message , Session } from './Types.ts'


const messages = new Map<string,Message>
const sessions = new Map<string,Session>
