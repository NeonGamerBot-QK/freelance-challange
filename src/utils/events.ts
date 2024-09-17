import path from "path"
import type { EventHandler, ModifiedClient } from "../types";
import fs from "fs";
export default async function  loadEvents(client: ModifiedClient) {
const files = fs.readdirSync(path.join(__dirname, '..', 'events')).filter(f=>f.endsWith('.ts'))
//    console.log(files)
    for (const f of files) {
        let data:  EventHandler
        try {
            data = await import(path.join(__dirname, '..', 'events', f)).then(d=>d.default)
        } catch (e) {
            console.error(e)
            console.error(`Failed to load event file: ${f}`)
            // data = null;
            continue;
        }
        client.on(data.name as string, (...args) => data.execute(...args, client))
        console.log(`Enabled event ${f} (${data.name})`)
    }
}