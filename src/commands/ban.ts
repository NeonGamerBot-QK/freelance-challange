import type { Command } from "../types";
import Utils from "../utils/Utils";
export default {
  name: "ban",
  description: "ban a user",
  usage: "[@user] <reason>",
  async execute(message, args, client) {
    if (!message.member?.permissions.has("BanMembers")) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "No Permission",
            "You do not have permission to use this command",
          ),
        ],
      });
    }
    const user = message.mentions.users.first();
    let reason =
      args.slice(1).length > 0 ? args.slice(1).join(" ") : "No reason provided";
    if (!user) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed("No User", "Please mention a user to ban"),
        ],
      });
    }
    const member = message.guild?.members.cache.get(user.id);
    if (!member) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed("No Member", "User is not in the server"),
        ],
      });
    }
    const badIds = [client.user?.id, message.guild?.ownerId, message.author.id];
    if (badIds.includes(member.id)) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "Bad User",
            "You cannot ban this user. Reasons\n- Your are trying to ban me\n- You are trying to ban yourself\n- You are trying to ban the server owner",
          ),
        ],
      });
    }
    //@ts-ignore
    if (Utils.Commands.checkRolePerms(message.member, member)) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "Role Error",
            "You cannot ban this user because they have a role higher than you",
          ),
        ],
      });
    }
    const serverConfig: any = await client.db?.server.findFirst({
      where: {
        discord_id: message.guild?.id,
      },
    });
    if (serverConfig && serverConfig.logChannel) {
      const logChannel = message.guild?.channels.cache.get(
        serverConfig.logChannel,
      );
      if (logChannel && logChannel.isTextBased()) {
        logChannel.send({
          embeds: [
            Utils.Embeds.getDefaultEmbed()
              .setTitle("User Banned")
              .setDescription(
                `User: ${user.tag}\nModerator: ${message.author.tag}\nReason: ${reason}`,
              ),
          ],
        });
      }
    }
    member
      .ban({
        reason: reason,
      })
      .then(() => {
        message.reply({
          embeds: [
            Utils.Embeds.getSuccessEmbed("Banned", `Banned ${user.tag}`),
          ],
        });
      })
      .catch((error) => {
        message.reply({
          embeds: [Utils.Embeds.getErrorEmbed("Error", error)],
        });
      });
  },
} satisfies Command;
