
export { reactions , messages , sessions }

import type { Message , Session , Reaction } from './Types.ts'


const reactions = new Map<string,Array<Reaction>>
const messages = new Map<string,Message>
const sessions = new Map<string,Session>
