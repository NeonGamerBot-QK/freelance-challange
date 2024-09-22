import type { Command } from "../types";
import Utils from "../utils/Utils";

export default {
  name: "getpoints",
  description: "Get points of a user",
  usage: "<@user>",
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
    const user = message.mentions.users.first() || message.author;

    let userData: any = await client.db?.user.findFirst({
      where: {
        discord_id: user.id,
      },
    });
    if (!userData) {
      const def = Utils.db.getDefaultUser(user.id);
      userData = def;
      await client.db.user.create({
        data: def,
      });
    }
    const embed = Utils.Embeds.getDefaultEmbed();
    embed.setTitle(`User Points`);
    embed.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() });
    //    console.debug(userData)
    embed.setDescription(`${user.toString()} has ${userData.points} points!`);
    message.reply({
      embeds: [embed],
    });
  },
} satisfies Command;
