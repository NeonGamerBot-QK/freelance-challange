import type { Message } from "discord.js";
import type { Command, ModifiedClient } from "../types";
import Utils from "../utils/Utils";

export default {
  name: "setwelcomemessage",
  description: "set welcome message",
  async execute(message: Message, args: string[], client: ModifiedClient) {
    if (!client.db)
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "Database Error",
            "Database not connected.",
          ),
        ],
      });
    if (!message.member?.permissions.has("ManageGuild")) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "No Permission",
            "You do not have permission to use this command",
          ),
        ],
      });
    }
    if (!args[0]) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "No Message",
            "Please provide message to set.",
          ),
        ],
      });
    }

    let serverData: any = await client.db.server.findFirst({
      where: {
        discord_id: message.guild?.id,
      },
    });
    if (serverData) {
      await client.db.server.update({
        where: {
          id: serverData.id,
        },
        data: {
          welcomeMessage: args.join(" "),
        },
      });
    } else {
      // TOOD add typings
      let def: any = Utils.db.getDefaultServer(message.guild?.id as string);
      def.welcomeMessage = args.join(" ");
      serverData = await client.db.server.create({
        data: def,
      });
    }
    message.reply({
      embeds: [
        Utils.Embeds.getSuccessEmbed(
          "Welcome message Set",
          `Welcome message is now \`${args.join(" ")}\``,
        ),
      ],
    });
  },
} satisfies Command;
