import type { Command } from "../types";
import Utils from "../utils/Utils";

export default {
  name: "removerole",
  description: "remove a role from a user",
  usage: "[@user] [@role]",
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
    if (!message.member?.permissions.has("ManageRoles")) {
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
            "No Role",
            "Please provide role to remove.",
          ),
        ],
      });
    }
    const role = message.mentions.roles.first();
    if (!role) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "No Role",
            "Please provide role to remove.",
          ),
        ],
      });
    }
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "No User",
            "Please provide user to remove role.",
          ),
        ],
      });
    }
    const member = message.guild?.members.cache.get(user.id);
    if (!member) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "No Member",
            "User is not a member of this server.",
          ),
        ],
      });
    }
    if (!member.roles.cache.has(role.id)) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "Role not found",
            "User does not have this role.",
          ),
        ],
      });
    }
    member.roles.remove(role);
    message.reply({
      embeds: [
        Utils.Embeds.getSuccessEmbed(
          "Role Removed",
          `Role ${role.name} removed from ${user.tag}`,
        ),
      ],
    });
  },
} satisfies Command;
