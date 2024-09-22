import type { Message } from "discord.js";
import Utils from "../utils/Utils";
import type { Command, ModifiedClient } from "../types";

export default {
  name: "assignrole",
  description: "add a role to a user",
  usage: "[@user] [@role]",
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
          Utils.Embeds.getErrorEmbed("No Role", "Please provide role to add."),
        ],
      });
    }
    const role = message.mentions.roles.first();
    if (!role) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed("No Role", "Please provide role to add."),
        ],
      });
    }
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "No User",
            "Please provide user to add role.",
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
    if (member.roles.cache.has(role.id)) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "Role Exists",
            "User already has this role.",
          ),
        ],
      });
    }
    member.roles
      .add(role)
      .then(() => {
        message.reply({
          embeds: [
            Utils.Embeds.getSuccessEmbed(
              "Role Added",
              `Added role ${role.name} to ${user.tag}`,
            ),
          ],
        });
      })
      .catch((error: any) => {
        message.reply({
          embeds: [Utils.Embeds.getErrorEmbed("Error", error.message)],
        });
      });
  },
} satisfies Command;
