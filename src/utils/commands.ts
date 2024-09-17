import path from "path";
import type { Command, EventHandler, ModifiedClient } from "../types";
import fs from "fs";
export default async function loadCommands(client: ModifiedClient) {
  if (!client.commands) return;
  const files = fs
    .readdirSync(path.join(__dirname, "..", "commands"))
    .filter((f) => f.endsWith(".ts"));
  //    console.log(files)
  for (const f of files) {
    let data: Command;
    try {
      data = await import(path.join(__dirname, "..", "commands", f)).then(
        (r) => r.default,
      );
    } catch (e) {
      console.error(e);
      console.error(`Failed to load command file: ${f}`);
      continue;
    }
    client.commands.set(data.name, data);
    console.log(`Registered command ${data.name} - ${data.description}`);
  }
}
