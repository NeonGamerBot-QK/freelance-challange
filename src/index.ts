// Main file

import "dotenv/config";
import "./utils/logging";
import { PrismaClient } from "@prisma/client";
import { Client, Collection, IntentsBitField, Partials } from "discord.js";
import type { ModifiedClient } from "./types";
import loadEvents from "./utils/events";
import loadCommands from "./utils/commands";
const prisma = new PrismaClient();
const client: ModifiedClient = new Client({
  intents: [
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
  ],
  partials: [Partials.Channel],
});
client.db = prisma;
client.commands = new Collection();
await Promise.race([loadEvents(client), loadCommands(client)]);
client.login(process.env.DISCORD_TOKEN);

process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);
