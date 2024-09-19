import type { Message } from "discord.js";
import type { Command, ModifiedClient, Server } from "../types";
import Utils from "../utils/Utils";

export default {
  name: "setwelcomechannel",
  description: "set welcome channel",
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
            "No Channel",
            "Please provide channel to set.",
          ),
        ],
      });
    }
    const channel = message.mentions.channels.first() || message.channel;

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
          welcomeChannel: channel.id,
        },
      });
    } else {
      let def: Server = Utils.db.getDefaultServer(message.guild?.id as string);
      def.welcomeChannel = channel.id;
      serverData = await client.db.server.create({
       //@ts-ignore
        data: def,
      });
    }
    message.reply({
      embeds: [
        Utils.Embeds.getSuccessEmbed(
          "Welcome channel Set",
          `Welcome channel is now ${channel.toString()}`,
        ),
      ],
    });
    // let userData: any = await client.db?.user.findFirst({
    //   where: {
    //     discord_id: user.id,
    //   },
    // });
    // if (!userData) {

    // await client.db.user.update({
    //   where: {
    //     id: userData.id,
    //   },
    //   data: {
    //     points: parseInt(args[0]),
    //   },
    // });
  },
} satisfies Command;
