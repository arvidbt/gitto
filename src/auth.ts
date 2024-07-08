import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "./server/db/schema";
import { env } from "./env";
import { cache } from "react";

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
      authorization: {
        params: {
          scope: "repo read:user, user:email",
        },
      },
    }),
  ],
  secret: env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

const { handlers, auth: uncachedAuth, signOut, signIn } = NextAuth(authConfig);

export { signIn, signOut, handlers };
export const auth = cache(uncachedAuth);
