import { EmbedBuilder, type Message } from "discord.js";
export const Embeds = {
    getErrorEmbed(title:string, description:string) {
        const embed = Embeds.getDefaultEmbed()
        embed.setTitle(title)
        embed.setDescription(description)
        embed.setColor('Red')
        return embed;
    },
    getSuccessEmbed(title:string, description:string) {
        const embed = Embeds.getDefaultEmbed()
        embed.setTitle(title)
        embed.setDescription(description)
        embed.setColor('Green')
        return embed;
    },
    getDefaultEmbed() {
        const embed = new EmbedBuilder()
        embed.setTimestamp()
        embed.setColor('Random')
        return embed;
    }
    
}
export const Commands = {
    notFound(message: Message) {
        message.reply({
            embeds: [Embeds.getErrorEmbed('Command does not exist', `the command you requested does not exist. `)]
        })
    },
    cmdError(error: string, message: Message) {
        message.reply({
            embeds: [Embeds.getErrorEmbed('Error', error)]
        })
    }
}
export const db = {
    getDefaultUser(id: string) { 
        return {
            discord_id: id,
            points: 0
        }
    }
}
export default {
    Commands,
    Embeds, 
    db
}