import type { Command } from "../types";
const Util = require("../utils/Utils");

export default {
  name: "help",
  description: "Get all cmds ",
  usage: "<command>",
  execute(message, args, client) {
    const embed = Util.Embeds.getDefaultEmbed();
    embed.setTitle(`Help`);
    embed.setDescription(
      client.commands
        ?.map(
          (cmd) =>
            `**!${cmd.name}** ${cmd.usage ? `\`${cmd.usage}\`` : ""} - ${cmd.description}`,
        )
        .join("\n"),
    );
    embed.setFooter({ text: `Total Commands: ${client.commands?.size}` });
    message.reply({ embeds: [embed] });
  },
} satisfies Command;
