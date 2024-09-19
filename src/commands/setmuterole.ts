import type { Message } from "discord.js";
import type { Command, ModifiedClient, Server } from "../types";
import Utils from "../utils/Utils";

export default {
  name: "setmuterole",
  description: "set mute role",
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
          Utils.Embeds.getErrorEmbed("No Role", "Please provide role to set."),
        ],
      });
    }
    const role = message.mentions.roles.first();
    if (!role) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed("No Role", "Please provide role to set."),
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
          muteRole: role.id,
        },
      });
    } else {
      let def: Server = Utils.db.getDefaultServer(message.guild?.id as string);
      def.muteRole = role.id;
      serverData = await client.db.server.create({
       //@ts-ignore
        data: def,
      });
    }
    message.reply({
      embeds: [
        Utils.Embeds.getSuccessEmbed(
          "Mute role Set",
          `Mute role is now ${role.toString()}`,
        ),
      ],
    });
  },
} satisfies Command;
