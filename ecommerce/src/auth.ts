import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import Facebook from "next-auth/providers/facebook";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Facebook,
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}/api/login`,
          {
            email: credentials?.email,
            password: credentials?.password,
          }
        );
        if (res.data.data.user) {
          return res.data.data.user;
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id; // Ensure _id exists
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.active = user.active;
        token.photo = user.photo;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id; // Ensure _id is correctly assigned
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.role = token.role;
        session.user.active = token.active;
        session.user.photo = token.photo;
      }
      return session;
    },
  },
});
