const { Events } = require("discord.js");
import type { EventHandler, ModifiedClient } from "../types";
import { type GuildMember } from "discord.js";
module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member: GuildMember, client: ModifiedClient) {
    if (!client.db) return;
    const serverData = await client.db.server.findFirst({
      where: {
        discord_id: member.guild.id,
      },
    });
    if (serverData?.welcomeChannel && serverData?.welcomeMessage) {
      const channel = member.guild.channels.cache.get(
        serverData.welcomeChannel,
      );
      if (channel?.isTextBased()) {
        channel.send(
          serverData.welcomeMessage.replace(/{user}/g, member.user.tag),
        );
      }
    }
  },
} satisfies EventHandler;
