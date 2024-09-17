const { Events } = require("discord.js");
import type { EventHandler, ModifiedClient } from "../types";
const Util = require('../utils/Utils')
import {  type Message} from "discord.js"
module.exports = {
    name: Events.MessageCreate,
  async  execute(message: Message, client: ModifiedClient) {
      // console.log(`Bot ready "${client.user?.tag}"`)
      const prefix = "!"
      if (message.author.bot) return;
      if (message.author.id == client.user?.id) return;
      if (!message.content.startsWith(prefix)) return;
      const args:string[] = message.content.slice(prefix.length).trim().split(/ +/)
      const cmd:string = args.shift() as string
      const fc = client.commands?.get(cmd);
      if (!fc) return Util.Commands.notFound(message);
      try {
          await fc.execute(message, args, client)
      } catch (e: any) {
          Util.Commands.cmdError(e.message, message)
      }
    }
} satisfies EventHandler;