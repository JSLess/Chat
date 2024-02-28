
export type { Group , Icon }
export { Reactions , Groups }

import { parse } from 'TOML'
import { join } from 'Deno/path/join.ts'
import { z } from 'Zod'


const Manifest = z.object({
    name : z.string().min(1) ,
    handles : z.array(z.string().min(1).regex(/[-a-z]/i)).min(1) ,
    tint : z.string().regex(/#([0-9a-f]{3}|[0-9a-f]{6})/i) ,
    Icon : z.array(
        z.object({
            handles : z.array(z.string()).min(1) ,
            file : z.string()
        })
    )
})

type Manifest = typeof Manifest._type

type Group = Omit<Manifest,'Icon'> & {
    preview : string
    id : string
    Icon : Icon[]
}

type Icon = Manifest['Icon'][number] & {
    id : string
}


const Reactions = new Map<string,Icon>
const Groups = [] as Array<Group>

const root = `${ Deno.cwd() }/Source/Static/Emotes`


const folders = Deno.readDir(root)

for await ( const folder of folders ){

    if( ! folder.isDirectory )
        continue

    const manifest = join(root,folder.name,`Group.toml`)

    const text = await Deno.readTextFile(manifest)

    const toml = parse(text)

    const config = await Manifest.parseAsync(toml) as Group

    for ( const icon of config.Icon as Icon[] ){
        icon.file = join(`Asset`,`Emotes`,folder.name,`Emotes`,icon.file)
        icon.id = crypto.randomUUID()
        Reactions.set(icon.id,icon)
    }

    Groups.push({
        ... config ,
        preview : join(`Asset`,`Emotes`,folder.name,'Preview.png') ,
        id : crypto.randomUUID()
    })
}
