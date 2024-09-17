const { Events } = require("discord.js");
import type { EventHandler } from "../types";
import type {Client} from "discord.js"
module.exports = {
    name: Events.ClientReady,
  async  execute(client: Client ) {
        console.log(`Bot ready "${client.user?.tag}"`)
    }
} satisfies EventHandler;