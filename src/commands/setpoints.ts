import type { Command } from "../types";
import Utils from "../utils/Utils";

export default {
  name: "setpoints",
  description: "set points for you or  another user",
  usage: "[@user] [points]",
  async execute(message, args, client) {
    if (!client.db)
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "Database Error",
            "Database not connected.",
          ),
        ],
      });
    if (!message.member?.permissions.has("ManageMessages")) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "No Permission",
            "You do not have permission to use this command",
          ),
        ],
      });
    }
    if (args.length < 2) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "No Points",
            "Please provide points to set.",
          ),
        ],
      });
    }
    const user = message.mentions.users.first() || message.author;

    let userData: any = await client.db?.user.findFirst({
      where: {
        discord_id: user.id,
      },
    });
    if (!userData) {
      const def = Utils.db.getDefaultUser(user.id);
      userData = def;
      userData = await client.db.user.create({
        data: def,
      });
    }
    await client.db.user.update({
      where: {
        id: userData.id,
      },
      data: {
        points: parseInt(args[0]),
      },
    });
    message.reply({
      embeds: [
        Utils.Embeds.getSuccessEmbed(
          "Points Set",
          `Points for ${user.toString()} set to ${args[0]}`,
        ),
      ],
    });
  },
} satisfies Command;
