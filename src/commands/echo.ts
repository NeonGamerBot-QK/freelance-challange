import type { Command } from "../types";
const Util = require('../utils/Utils')

export default {
    name: "echo",
    description: "Hello There!",
    usage: '[message]',
    execute(message, args, client) {
    const wl = args.length
    const contentToEchoRaw = args.join(' ')
        const embed = Util.Embeds.getDefaultEmbed()
        embed.setTitle(`Echo`)
        // its in an embed so
        // no mentions will work
        // content can be longer
        embed.setDescription(contentToEchoRaw)  
        embed.addFields([{
        name: 'Word Count',
         value: wl.toString()
        }])
        message.reply({ embeds: [embed] })
}
} satisfies Command;