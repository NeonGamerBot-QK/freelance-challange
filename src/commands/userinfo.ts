import { Embed, type Message } from "discord.js";
import type { Command } from "../types";
// import Utils from "../utils/Utils";
const Util = require("../utils/Utils");

export default {
  name: "userinfo",
  description: "get info on a user",
  usage: "<@user>",
  async execute(message: Message , args, client) {
      const member = message.guild?.members.cache.get(message.mentions.users.first()?.id || "") || message.member
      if (!member) {
          return message.reply({ embeds: [Util.Embeds.getErrorEmbed(`No user`, `No user was found.`)]})
      }
      if (member?.partial) await member.fetch();
      const embed = Util.Embeds.getDefaultEmbed();
      embed.setTitle(`User Info`);
      embed.setThumbnail(member.user.displayAvatarURL())
        embed.addFields([
            {
                name: "User",
                value: member.user.tag
            },
            {
                name: "Joined",
                value: member.joinedAt?.toDateString()
            },
            {
                name: "Created",
                value: member.user.createdAt.toDateString()
            },
            {
                name: "Roles",
                value: member.roles.cache.map(r => r.toString()).join(", ")
            },
            {
                name: "isBot",
                value: member.user.bot ? "Yes" : "No"
            }
        ])
      message.reply({ embeds: [embed] });
    },
} satisfies Command;
