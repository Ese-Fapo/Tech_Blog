import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

const normalizeUrl = (url?: string) => url?.replace(/\/+$/, "");

const isProduction = process.env.NODE_ENV === "production";
const vercelUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;
const configuredAuthUrl = normalizeUrl(process.env.BETTER_AUTH_URL);

const authBaseUrl = isProduction
    ? configuredAuthUrl || normalizeUrl(vercelUrl) || "https://tech-blog-i77h-5eu5ojvnm-ese-fapohundas-projects.vercel.app"
    : "http://localhost:3000";

const trustedOrigins = Array.from(
    new Set(
        [
            authBaseUrl,
            configuredAuthUrl,
            normalizeUrl(vercelUrl),
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ].filter(Boolean)
    )
) as string[];

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
        baseURL: authBaseUrl,
        trustedOrigins,
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },
    },

    
    callbacks: {
        async onSuccess(context: any) {
            console.log("Auth successful:", context.user);
        },
        async onError(context: any) {
            console.error("Auth error:", context.error);
        },
    },
});
