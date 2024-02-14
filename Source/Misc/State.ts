
export { reactions , messages , database , sessions }

import type { Message , Session , Reaction } from './Types.ts'


const database = await Deno.openKv('./Database/Storage.db');


const reactions = new Map<string,Array<Reaction>>
const messages = new Map<string,Message>
const sessions = new Map<string,Session>
