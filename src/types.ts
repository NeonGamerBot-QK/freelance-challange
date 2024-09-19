import type { PrismaClient } from "@prisma/client";
import type { Client, Collection, Events, Message } from "discord.js"

export type EventHandler = {
    name: Events;
    // execute: (x?: any) => void
    execute: any
}
export type Command = {
    name: string;
    usage?: string;
    description: string;
    execute: (message: Message,args: string[], client: ModifiedClient) => void
}
export interface ModifiedClient extends Client {
    db?: PrismaClient;
    commands?: Collection<string, Command>
}
export interface Server {
    id?: number;
    discord_id?: string;
    muteRole?: string;
    welcomeChannel?: string;
    logChannel?: string;
    welcomeMessage?: string;
}