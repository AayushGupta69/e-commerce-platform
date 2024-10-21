import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any): Promise<any> {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Email and Password are required fields.");
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            throw new Error(
              "No user found with this email. Please signup first."
            );
          }

          const passwordValidation = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordValidation) {
            throw new Error(
              "Invalid credentials. Please check your password and try again."
            );
          }

          return user;
        } catch (error) {
          throw new Error(
            (error as Error).message ||
              "An unknown error occurred during authentication."
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
