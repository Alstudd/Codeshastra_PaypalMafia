"use server"
import exp from "constants"
import { getServerAuthSession } from "~/server/auth"

export async function uid(): Promise<string | null> {
    const session = await getServerAuthSession()
    if (!session?.user) {
        return null
    }
    return session.user.id
}