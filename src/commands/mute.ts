import type { Command } from "../types";
import Utils from "../utils/Utils";
import ms from "ms";
// TODO: test the file in discord
// TODO: the entire file 75%
export default {
  name: "mute",
  description: "mute a user",
  usage: "[@user] [time] <reason>",
  async execute(message, args, client) {
    if(!message.guild) return;
    // mute cmd with time for mute and reason
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
    const user = message.mentions.users.first();
    let duration = args[1];
    let reason = args.slice(2).length > 0 ? args.slice(2).join(" ") : "No reason provided";
    if (!user) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "No User",
            "Please mention a user to mute",
          ),
        ],
      });
    }
    if (!duration) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "No Duration",
            "Please provide a duration for the mute",
          ),
        ],
      });
    }
    if (!ms(duration)) {
      return message.reply({
        embeds: [
          Utils.Embeds.getErrorEmbed(
            "Invalid Duration",
            "Please provide a valid duration for the mute",
          ),
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
            "You cannot mute this user. Reasons\n- Your are trying to mute me\n- You are trying to mute yourself\n- You are trying to mute the server owner",
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
            "You cannot mute this user because they have a role higher than you",
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
              .setTitle("User Muted")
              .setDescription(
                `User: ${user.tag}\nModerator: ${message.author.tag}\nReason: ${reason}`,
              ),
          ],
        });
      }
    }
    // get current user data
    // const userData = await client.db?.user.findFirst({
    //   where: {
    //     discord_id: user.id,
    //   },
    // });
    // if (!userData) return;
    // update db for user
    client.db?.user.update({
      where: {
        discord_id: user.id,
      },
      data: {
        muted: true,
        mutedUntil: Date.now() + ms(duration),
      },
    });

    // add muted role from db
    member.roles
      .add(serverConfig.muteRole)
      .then(() => {
        message.reply({
          embeds: [Utils.Embeds.getSuccessEmbed("Muted", `Muted ${user.tag}`)],
        });
        setTimeout(() => {
          member.roles.remove(serverConfig.muteRole);
          client.db?.user.update({
            where: {
              discord_id: user.id,
            },
            data: {
              muted: false,
              mutedUntil: null,
            },
          });
        }
        , ms(duration));
      })
      .catch((error: any) => {
        message.reply({
          embeds: [Utils.Embeds.getErrorEmbed("Error", error.message)],
        });
      });
  },
} satisfies Command;

// if (!message.member?.permissions.has("ManageMessages")) {
//   return message.reply({
//     embeds: [
//       Utils.Embeds.getErrorEmbed(
//         "No Permission",
//         "You do not have permission to use this command",
//       ),
//     ],
//   });
// }
// const user = message.mentions.users.first();
// let reason =
//   args.slice(1).length > 0 ? args.slice(1).join(" ") : "No reason provided";
// if (!user) {
//   return message.reply({
//     embeds: [
//       Utils.Embeds.getErrorEmbed(
//         "No User",
//         "Please mention a user to mute",
//       ),
//     ],
//   });
// }
// const member = message.guild?.members.cache.get(user.id);
// if (!member) {
//   return message.reply({
//     embeds: [
//       Utils.Embeds.getErrorEmbed("No Member", "User is not in the server"),
//     ],
//   });
// }
// const badIds = [client.user?.id, message.guild?.ownerId, message.author.id];
// if (badIds.includes(member.id)) {
//   return message.reply({
//     embeds: [
//       Utils.Embeds.getErrorEmbed(
//         "Bad User",
//         "You cannot mute this user. Reasons\n- Your are trying to mute me\n- You are trying to mute yourself\n- You are trying to mute the server owner",
//       ),
//     ],
//   });
// }
// //@ts-ignore
// if (Utils.Commands.checkRolePerms(message.member, member)) {
//   return message.reply({
//     embeds: [
//       Utils.Embeds.getErrorEmbed(
//         "Role Error",
//         "You cannot mute this user because they have a role higher than you",
//       ),
//     ],
//   });
// }
// const serverConfig: any = client.db?.server.findFirst({
//   where: {
//     discord_id: message.guild?.id,
//   },
// });
// if (serverConfig && serverConfig.logChannel) {
//   const logChannel = message.guild?.channels.cache.get(
//     serverConfig.logChannel,
//   );
//   if (logChannel && logChannel.isTextBased()) {
//     logChannel.send({
//       embeds: [
//         Utils.Embeds.getDefaultEmbed()
//           .setTitle("User Muted")
//           .setDescription(
//             `User: ${user.tag}\nModerator: ${message.author.tag}\nReason: ${reason}`,
//           ),
//       ],
//     });
//   }
// }
// member
//   .kick()
//   .then(() => {
//     message.reply({
//       embeds: [
//         Utils.Embeds.getSuccessEmbed("Muted", `Muted ${user.tag}`),
//       ],
//     });
//   })
//   .catch((error) => {
//     message.reply({
//       embeds: [Utils.Embeds.getErrorEmbed("Error", error)],
//     });
//   });
