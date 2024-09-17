import type { Command } from "../types";
//@ts-ignore
import { EmojiHash } from "@neongamerbot/utils"
export default {
    name: "hello",
    description: "Hello There!",
    execute(message, args, client) {
    const selectedEmoji =  EmojiHash.emojiTable[Math.round(Math.random() *  60)]
    message.reply(`Hello ${message.author.toString()} ${selectedEmoji}`)
}
} satisfies Command;