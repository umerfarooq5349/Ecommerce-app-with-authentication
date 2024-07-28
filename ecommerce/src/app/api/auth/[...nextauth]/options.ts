import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/app/api/auth/route";
import { UserModel } from "@/utils/model/user"; // Import your UserModel interface
import { JWT } from "next-auth/jwt";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLEID!,
      clientSecret: process.env.GOOGLESECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const user = await login(credentials!.email, credentials!.password);
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { id, email, name, role, active, photo } = user as UserModel;
        token.id = id;
        token.email = email;
        token.name = name;
        token.role = role;
        token.active = active;
        token.photo = photo;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token && typeof token.id === "string") {
        session = {
          ...session,
          _id: token.id,
          session_email: user.email,
          session_name: token.name!,
          session_role: token.role as string | null | undefined,
          // session_active: token.active as boolean | null | undefined,
        };
      }
      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: `jwt`,
      options: {
        path: "/",
      },
    },
  },
};
