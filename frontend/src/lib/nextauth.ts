import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import GoogleProvider from "next-auth/providers/google";

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role: string;
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: string;
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({token}) => {
            const db_user = await prisma.user.findFirst({
                where: {
                    email: token?.email
                }
            });
            if (db_user) {
                token.id = db_user.id;
                token.role = db_user.role ?? ''; // Fix: Use optional chaining and provide default value
            }
            return token;
        },
        session: async ({session, token}) => {
            if (token) {
                session.user = token;
            }
            console.log('session', session);
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ]
};

export const getAuthSession = () => {
    return getServerSession(authOptions);
};